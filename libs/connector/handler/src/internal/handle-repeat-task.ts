import { ConnectorTask } from '@shukun/schema';

import { HandlerContext } from './types';

export const handleRepeatTask = (
  task: ConnectorTask,
  context: HandlerContext,
) => {
  return {
    ...context,
    next: task.next,
  };
};
