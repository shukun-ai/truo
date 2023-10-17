import { ConnectorTask } from '@shukun/schema';

import { HandlerContext } from '../types';

export const handleTransformerTask = async (
  task: ConnectorTask,
  context: HandlerContext,
): Promise<HandlerContext> => {
  return {
    ...context,
    next: task.next,
    input: task.parameters,
  };
};
