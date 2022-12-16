import { Injectable } from '@nestjs/common';
import {
  FlowEvent,
  FlowEventCompiledCodes,
  FlowEventParallel,
  FlowEventRepeat,
  FlowEvents,
} from '@shukun/schema';

import { NestedEventService } from '../compiler/nested-event.service';

import { FlowDefinitionException } from '../exceptions/flow-definition-exception';
import { FlowNoCompiledCodeException } from '../exceptions/flow-no-compiled-code-exception';
import { FlowRepeatCountException } from '../exceptions/flow-repeat-count-exception';
import { SandboxService } from '../sandbox/sandbox.service';

import { ResolverContext } from './flow.interface';

@Injectable()
export class ResolverService {
  constructor(
    private readonly nestedEventService: NestedEventService,
    private readonly sandboxService: SandboxService,
  ) {}

  async executeNextEvent(
    events: FlowEvents,
    compiledCodes: FlowEventCompiledCodes,
    context: ResolverContext,
  ): Promise<ResolverContext> {
    if (!context.next) {
      return context;
    }

    const startEvent = this.findEvent(context.next, events);
    const computedContext = await this.handleEvent(
      startEvent,
      compiledCodes,
      context,
    );

    return await this.executeNextEvent(events, compiledCodes, {
      ...computedContext,
      input: computedContext.output,
    });
  }

  protected async handleEvent(
    event: FlowEvent,
    compiledCodes: FlowEventCompiledCodes,
    context: ResolverContext,
  ): Promise<ResolverContext> {
    switch (event.type) {
      case 'Repeat':
        return this.handleRepeatEvent(event, compiledCodes, context);
      case 'Parallel':
        return this.handleParallelEvent(event, compiledCodes, context);
      default:
        return this.handleCommonEvent(event, compiledCodes, context);
    }
  }

  protected async handleCommonEvent(
    event: FlowEvent,
    compiledCodes: FlowEventCompiledCodes,
    context: ResolverContext,
  ) {
    const compiledCode = this.findCompiledCode(compiledCodes, context);
    const computedContext = await this.executeVM(compiledCode, context);

    return computedContext;
  }

  protected async handleParallelEvent(
    event: FlowEventParallel,
    compiledCodes: FlowEventCompiledCodes,
    context: ResolverContext,
  ): Promise<ResolverContext> {
    const compiledCode = this.findCompiledCode(compiledCodes, context);
    const computedContext = await this.executeVM(compiledCode, context);

    const branchesPromise = event.branches.map(async (branch, index) => {
      const parentEventNames = this.nestedEventService.combinePrefix(
        this.nestedEventService.combinePrefix(
          context.parentEventNames,
          context.next,
        ),
        index.toString(),
      );

      const { output } = await this.executeNextEvent(
        branch.events,
        compiledCodes,
        {
          ...context,
          next: branch.startEventName,
          parentEventNames,
          index,
        },
      );
      return output;
    });

    const outputArray = await Promise.all(branchesPromise);

    return {
      ...computedContext,
      output: outputArray,
    };
  }

  protected async handleRepeatEvent(
    event: FlowEventRepeat,
    compiledCodes: FlowEventCompiledCodes,
    context: ResolverContext,
  ): Promise<ResolverContext> {
    const { startEventName, events } = this.prepareRepeatEvent(event);
    const compiledCode = this.findCompiledCode(compiledCodes, context);
    const computedContext = await this.executeVM(compiledCode, context);
    const repeatCount = computedContext.output;
    const outputArray: unknown[] = [];

    if (typeof repeatCount !== 'number') {
      throw new FlowRepeatCountException('The repeatCount is not number type.');
    }

    this.checkMaxRepeatCount(repeatCount);

    for (let index = 0; index < repeatCount; index++) {
      const { output } = await this.executeNextEvent(events, compiledCodes, {
        ...context,
        next: startEventName,
        parentEventNames: this.nestedEventService.combinePrefix(
          context.parentEventNames,
          context.next,
        ),
        index,
      });
      outputArray.push(output);
    }

    return {
      ...computedContext,
      output: outputArray,
    };
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

  protected findCompiledCode(
    compiledCodes: FlowEventCompiledCodes,
    context: ResolverContext,
  ): string {
    const nestedEventName = this.nestedEventService.combinePrefix(
      context.parentEventNames,
      context.next,
    );
    const code = compiledCodes[nestedEventName];

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

  protected checkMaxRepeatCount(count: number) {
    if (count > 1000) {
      throw new FlowDefinitionException(
        `The repeat count is more than max value(1000): ${count}.`,
      );
    }
  }

  protected async executeVM(
    compiledCode: string,
    context: ResolverContext,
  ): Promise<ResolverContext> {
    return await this.sandboxService.executeVM(compiledCode, context);
  }
}
