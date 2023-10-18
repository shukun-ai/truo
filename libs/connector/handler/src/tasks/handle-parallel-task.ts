import { TypeException } from '@shukun/exception';
import { ConnectorTask } from '@shukun/schema';

import {
  HandlerContext,
  HandlerInjector,
  ParallelParameters,
} from '../connector-types';

export const handleParallelTask = async (
  task: ConnectorTask,
  context: HandlerContext,
  injector: HandlerInjector,
): Promise<HandlerContext> => {
  const { executeTask } = injector;

  if (!executeTask) {
    throw new TypeException('Did not find executeTask');
  }

  const { branches } = task.parameters as ParallelParameters;

  const branchesPromise = branches.map(async (branch, index) => {
    const computedContext = await executeTask(
      {
        ...context,
        next: branch.start,
        index,
      },
      injector,
    );
    return computedContext.input;
  });

  const outputArray = await Promise.all(branchesPromise);

  return {
    ...context,
    input: outputArray,
    next: task.next,
  };
};
