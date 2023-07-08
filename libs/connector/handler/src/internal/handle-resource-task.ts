import { ConnectorTask } from '@shukun/schema';

import { HandlerContext } from '../types';

export const handleResourceTask = async (
  task: ConnectorTask,
  context: HandlerContext,
) => {
  return {
    ...context,
    next: task.next,
  };
};
