import {
  HandlerContext,
  execute,
  parseParameters,
} from '@shukun/connector/handler';
import { ConnectorSchema, TaskSchema } from '@shukun/schema';

import { runSandbox } from './sandbox/sandbox';
import { taskHandlers } from './task-handlers';

export const executeConnector = async (
  context: HandlerContext,
  connector: ConnectorSchema,
  taskDefinitions: Record<string, TaskSchema>,
): Promise<HandlerContext> => {
  return execute(context, {
    connector,
    taskDefinitions,
    executeTask: execute,
    executeSandbox: runSandbox,
    parseParameters,
    taskHandlers,
  });
};
