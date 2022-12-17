import { Injectable } from '@nestjs/common';
import {
  FlowEvent,
  FlowEventCompiledCode,
  FlowEventCompiledCodes,
  FlowEvents,
  FlowOrgCompiledCodes,
  FlowSchema,
} from '@shukun/schema';

import { FlowDefinitionException } from '../exceptions/flow-definition-exception';

import { CompileFactoryService } from './compile-factory.service';

@Injectable()
export class CompilerService {
  constructor(private readonly compileFactoryService: CompileFactoryService) {}

  async compileFlows(flows: FlowSchema[]) {
    const flowOrgCompiledCodes: FlowOrgCompiledCodes = {};

    for (let index = 0; index < flows.length; index++) {
      const flowEventCompiledCodes = await this.compileEvents(
        flows[index].events,
      );
      flowOrgCompiledCodes[flows[index].name] = flowEventCompiledCodes;
    }

    return flowOrgCompiledCodes;
  }

  async compileEvents(events: FlowEvents): Promise<FlowEventCompiledCodes> {
    let flowEventCompiledCodes: FlowEventCompiledCodes = {};

    for (const [eventName, event] of Object.entries(events)) {
      const code = await this.compileEvent(event);

      if (flowEventCompiledCodes[eventName]) {
        throw new FlowDefinitionException(
          'The eventName is duplicate: {{eventName}}',
          { eventName },
        );
      }

      flowEventCompiledCodes = {
        ...flowEventCompiledCodes,
        [eventName]: code,
      };
    }

    return flowEventCompiledCodes;
  }

  protected async compileEvent(
    currentEvent: FlowEvent,
  ): Promise<FlowEventCompiledCode> {
    const currentCode = await this.compileFactoryService.compileEvent(
      currentEvent,
    );

    return currentCode;
  }
}
