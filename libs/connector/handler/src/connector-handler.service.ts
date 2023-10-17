import { Injectable } from '@nestjs/common';

import { ConnectorSchema, TaskSchema } from '@shukun/schema';

import { execute } from './connector-handler';
import { taskHandlers } from './handlers-map';
import { runSandbox } from './sandbox/sandbox';
import { parseParameters } from './template/template';
import { HandlerContext } from './types';

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
