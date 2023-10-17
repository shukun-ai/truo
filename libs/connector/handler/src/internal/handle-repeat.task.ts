import { TypeException } from '@shukun/exception';

import { ConnectorTask } from '@shukun/schema';

import { HandlerContext, RepeatParameters } from '../types';

export const handleRepeatTask = async (
  task: ConnectorTask,
  context: HandlerContext,
): Promise<HandlerContext> => {
  const { executeTask } = context;

  if (!executeTask) {
    throw new TypeException('Did not find executeTask');
  }

  const { start, repeatCount } = task.parameters as RepeatParameters;
  const outputArray: unknown[] = [];

  if (typeof repeatCount !== 'number') {
    throw new TypeException('repeatCount is not a number.');
  }

  if (repeatCount > 1000) {
    throw new TypeException('Did not support repeatCount greater than 1000.');
  }

  for (let index = 0; index < repeatCount; index++) {
    const { input: output } = await executeTask({
      ...context,
      next: start,
      index,
    });
    outputArray.push(output);
  }

  return {
    ...context,
    input: outputArray,
    next: task.next,
  };
};
