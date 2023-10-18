import { TypeException } from '@shukun/exception';
import { ConnectorTask } from '@shukun/schema';

import { HandlerContext } from '../connector-types';

export type EitherParameters = {
  condition: unknown;
  right: string;
};

export const handleEitherTask = async (
  task: ConnectorTask,
  context: HandlerContext,
): Promise<HandlerContext> => {
  const { condition, right } = task.parameters as EitherParameters;

  if (typeof condition !== 'boolean') {
    throw new TypeException('The result of condition value is not boolean.');
  }

  const next = condition ? task.next : right;

  return {
    ...context,
    next,
  };
};
