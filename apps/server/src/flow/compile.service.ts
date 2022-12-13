import { Injectable } from '@nestjs/common';
import {
  FlowEvent,
  FlowEventCompiledCodes,
  FlowEvents,
  FlowOrgCompiledCodes,
  FlowSchema,
} from '@shukun/schema';

import { CompileFactoryService } from './compile-factory.service';
import { NestedEventService } from './nested-event.service';

@Injectable()
export class CompileService {
  constructor(
    private readonly compileFactoryService: CompileFactoryService,
    private readonly nestedEventService: NestedEventService,
  ) {}

  async compileFlows(flows: FlowSchema[]) {
    const flowOrgCompiledCodes: FlowOrgCompiledCodes = {};

    for (const [flowName, flow] of Object.entries(flows)) {
      const flowEventCompiledCodes = await this.compileEvents(
        flow.events,
        undefined,
      );
      flowOrgCompiledCodes[flowName] = flowEventCompiledCodes;
    }

    return flowOrgCompiledCodes;
  }

  async compileEvents(
    events: FlowEvents,
    parentEventNames: string | undefined,
  ): Promise<FlowEventCompiledCodes> {
    let flowEventCompiledCodes: FlowEventCompiledCodes = {};

    for (const [key, event] of Object.entries(events)) {
      const codes = await this.compileEvent(key, event, parentEventNames);
      flowEventCompiledCodes = {
        ...flowEventCompiledCodes,
        ...codes,
      };
    }

    return flowEventCompiledCodes;
  }

  protected async compileEvent(
    currentEventName: string,
    currentEvent: FlowEvent,
    parentEventNames: string | undefined,
  ): Promise<FlowEventCompiledCodes> {
    const currentCodeName = this.nestedEventService.combinePrefix(
      parentEventNames,
      currentEventName,
    );
    const currentCode = await this.compileFactoryService.compileEvent(
      currentEvent,
    );
    let childrenCodes: FlowEventCompiledCodes = {};

    if (currentEvent.type === 'Repeat') {
      childrenCodes = await this.compileEvents(
        currentEvent.events,
        currentCodeName,
      );
    }

    return {
      [currentCodeName]: currentCode,
      ...childrenCodes,
    };
  }
}
