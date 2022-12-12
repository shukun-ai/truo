import { Inject, Injectable } from '@nestjs/common';
import { FlowEvent, FlowEventRepeat, FlowEvents } from '@shukun/schema';

import { FlowDefinitionException } from './exceptions/flow-definition-exception';
import { FlowNoCompiledCodeException } from './exceptions/flow-no-compiled-code-exception';
import { FlowRepeatCountException } from './exceptions/flow-repeat-count-exception';
import { ResolverContext } from './interface';
import { NestedEventService } from './nested-event.service';
import { VMService } from './vm.service';

@Injectable()
export class ResolverService {
  constructor(
    @Inject() private readonly nestedEventService: NestedEventService,
    @Inject() private readonly vmService: VMService,
  ) {}

  async executeEvent(
    events: FlowEvents,
    input: unknown,
    context: ResolverContext,
  ): Promise<{ output: unknown; previousContext: ResolverContext }> {
    const startEventName = context.eventName;
    const startEvent = this.findEvent(startEventName, events);
    const output = await this.executeEventDetail(input, startEvent, context);
    const nextEventName = this.prepareNextEventName(startEvent);

    if (!nextEventName) {
      return {
        output,
        previousContext: context,
      };
    }

    return await this.executeEvent(events, output, {
      ...context,
      eventName: nextEventName,
    });
  }

  protected async executeEventDetail(
    input: unknown,
    event: FlowEvent,
    context: ResolverContext,
  ): Promise<unknown> {
    if (this.isRepeatEvent(event)) {
      return await this.executeRepeatEvent(input, event, context);
    }

    const compiledCode = this.findCompiledCode(context);
    return await this.executeVM(compiledCode, input, context);
  }

  protected async executeRepeatEvent(
    input: unknown,
    event: FlowEvent,
    context: ResolverContext,
  ) {
    const { startEventName, events } = this.prepareRepeatEvent(event);
    const compiledCode = this.findCompiledCode(context);
    const repeatCount = await this.executeVM(compiledCode, input, context);
    const output: unknown[] = [];

    if (typeof repeatCount !== 'number') {
      throw new FlowRepeatCountException('The repeatCount is not number type.');
    }

    for (let index = 0; index < repeatCount; index++) {
      const oneOutput = await this.executeEvent(events, input, {
        ...context,
        eventName: startEventName,
        parentEventNames: this.nestedEventService.combinePrefix(
          context.parentEventNames,
          context.eventName,
        ),
        index,
      });
      output.push(oneOutput);
    }
    return output;
  }

  protected findEvent(eventName: string, events: FlowEvents): FlowEvent {
    const event = events[eventName];

    if (!event) {
      throw new FlowDefinitionException(`Did not find event: ${eventName}`);
    }

    return event;
  }

  protected prepareNextEventName(currentEvent: FlowEvent): string | null {
    return 'next' in currentEvent && typeof currentEvent.next === 'string'
      ? currentEvent.next
      : null;
  }

  protected findCompiledCode(context: ResolverContext): string {
    const nestedEventName = this.nestedEventService.combinePrefix(
      context.parentEventNames,
      context.eventName,
    );
    const code = context.compiledCodes[nestedEventName];

    if (!code) {
      throw new FlowNoCompiledCodeException(
        `Did not find compiled code: ${nestedEventName}.`,
      );
    }

    return code;
  }

  protected isRepeatEvent(event: FlowEvent) {
    return event.type === 'Repeat';
  }

  protected prepareRepeatEvent(event: FlowEvent): FlowEventRepeat {
    if (event.type === 'Repeat') {
      return event;
    }

    throw new FlowDefinitionException('The event is not Repeat event.');
  }

  protected async executeVM(
    compiledCode: string,
    input: unknown,
    context: ResolverContext,
  ): Promise<unknown> {
    return await this.vmService.executeVM(compiledCode, input, context);
  }
}
