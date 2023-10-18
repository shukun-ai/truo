import {
  HandlerContext,
  HandlerInjector,
  execute,
  parseParameters,
} from '@shukun/connector/handler';
import { ConnectorSchema, TaskSchema } from '@shukun/schema';

import { runSandbox } from './sandbox/sandbox';

export const executeConnector = async (
  context: HandlerContext,
  connector: ConnectorSchema,
  taskDefinitions: Record<string, TaskSchema>,
  taskHandlers: HandlerInjector['taskHandlers'],
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
