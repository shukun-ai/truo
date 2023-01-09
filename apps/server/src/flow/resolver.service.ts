import { Injectable } from '@nestjs/common';

import {
  FlowDefinitionException,
  FlowNoCompiledCodeException,
  FlowRepeatCountException,
} from '@shukun/exception';
import {
  FlowEvent,
  FlowEventCompiledCodes,
  FlowEventParallel,
  FlowEventRepeat,
  FlowEvents,
} from '@shukun/schema';

import { SandboxContext } from '../sandbox/sandbox.interface';
import { SandboxService } from '../sandbox/sandbox.service';

@Injectable()
export class ResolverService {
  constructor(private readonly sandboxService: SandboxService) {}

  async executeNextEvent(
    events: FlowEvents,
    compiledCodes: FlowEventCompiledCodes,
    context: SandboxContext,
  ): Promise<SandboxContext> {
    if (!context.next) {
      return context;
    }

    const startEvent = this.findEvent(context.next, events);
    const computedContext = await this.handleEvent(
      startEvent,
      events,
      compiledCodes,
      context,
    );

    return await this.executeNextEvent(events, compiledCodes, computedContext);
  }

  protected async handleEvent(
    event: FlowEvent,
    events: FlowEvents,
    compiledCodes: FlowEventCompiledCodes,
    context: SandboxContext,
  ): Promise<SandboxContext> {
    switch (event.type) {
      case 'Repeat':
        return this.handleRepeatEvent(event, events, compiledCodes, context);
      case 'Parallel':
        return this.handleParallelEvent(event, events, compiledCodes, context);
      default:
        return this.handleCommonEvent(event, events, compiledCodes, context);
    }
  }

  protected async handleCommonEvent(
    event: FlowEvent,
    events: FlowEvents,
    compiledCodes: FlowEventCompiledCodes,
    context: SandboxContext,
  ) {
    const compiledCode = this.findCompiledCode(compiledCodes, context);
    const computedContext = await this.executeVM(compiledCode, context);

    return computedContext;
  }

  protected async handleParallelEvent(
    event: FlowEventParallel,
    events: FlowEvents,
    compiledCodes: FlowEventCompiledCodes,
    context: SandboxContext,
  ): Promise<SandboxContext> {
    const compiledCode = this.findCompiledCode(compiledCodes, context);
    const computedContext = await this.executeVM(compiledCode, context);

    const branchesPromise = event.branches.map(async (branch, index) => {
      const computedContext = await this.executeNextEvent(
        events,
        compiledCodes,
        {
          ...context,
          next: branch.startEventName,
          index,
        },
      );
      return computedContext.input;
    });

    const outputArray = await Promise.all(branchesPromise);

    return {
      ...computedContext,
      input: outputArray,
    };
  }

  protected async handleRepeatEvent(
    event: FlowEventRepeat,
    events: FlowEvents,
    compiledCodes: FlowEventCompiledCodes,
    context: SandboxContext,
  ): Promise<SandboxContext> {
    const { startEventName } = event;
    const compiledCode = this.findCompiledCode(compiledCodes, context);
    const computedContext = await this.executeVM(compiledCode, context);
    const repeatCount = computedContext.input;
    const outputArray: unknown[] = [];

    if (typeof repeatCount !== 'number') {
      throw new FlowRepeatCountException(
        'The repeatCount is not number type: {{ repeatCount }}.',
        { repeatCount },
      );
    }

    this.checkMaxRepeatCount(repeatCount);

    for (let index = 0; index < repeatCount; index++) {
      const { input: output } = await this.executeNextEvent(
        events,
        compiledCodes,
        {
          ...context,
          next: startEventName,
          index,
        },
      );
      outputArray.push(output);
    }

    return {
      ...computedContext,
      input: outputArray,
    };
  }

  protected findEvent(eventName: string, events: FlowEvents): FlowEvent {
    const event = events[eventName];

    if (!event) {
      throw new FlowDefinitionException('Did not find event: {{eventName}}', {
        eventName,
      });
    }

    return event;
  }

  protected findCompiledCode(
    compiledCodes: FlowEventCompiledCodes,
    context: SandboxContext,
  ): string {
    const eventName = context.next;
    const code = compiledCodes[eventName];

    if (!code) {
      throw new FlowNoCompiledCodeException(
        `Did not find compiled code: {{eventName}}.`,
        {
          eventName,
        },
      );
    }

    return code;
  }

  protected checkMaxRepeatCount(count: number) {
    if (count > 1000) {
      throw new FlowDefinitionException(
        'The repeat count is more than max value: {{ count }}',
        {
          count,
        },
      );
    }
  }

  protected async executeVM(
    compiledCode: string,
    context: SandboxContext,
  ): Promise<SandboxContext> {
    return await this.sandboxService.executeVM(compiledCode, context);
  }
}
