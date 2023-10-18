import { Injectable } from '@nestjs/common';

import {
  execute,
  parseParameters,
  HandlerContext,
} from '@shukun/connector/handler';
import { ConnectorSchema, TaskSchema } from '@shukun/schema';

import { taskHandlers } from './handlers-map';
import { runSandbox } from './sandbox/sandbox';

@Injectable()
export class ConnectorHandlerService {
  async execute(
    context: HandlerContext,
    connector: ConnectorSchema,
    taskDefinitions: Record<string, TaskSchema>,
  ): Promise<HandlerContext> {
    return execute(context, {
      connector,
      taskDefinitions,
      executeTask: execute,
      executeSandbox: runSandbox,
      parseParameters,
      taskHandlers,
    });
  }
}
