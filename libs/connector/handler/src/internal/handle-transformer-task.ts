import { ConnectorTask } from '@shukun/schema';

import { HandlerContext } from './types';

export const handleTransformerTask = (
  task: ConnectorTask,
  context: HandlerContext,
) => {
  return {
    ...context,
    next: task.next,
    input: task.parameters,
  };
};
