import { TypeException } from '@shukun/exception';
import { ConnectorTask } from '@shukun/schema';

import { ChoiceParameters, HandlerContext } from '../types';

export const handleChoiceTask = (
  task: ConnectorTask,
  context: HandlerContext,
) => {
  const { conditions } = task.parameters as ChoiceParameters;

  const item = conditions.find((item) => {
    if (typeof item.condition === 'boolean') {
      return item.condition;
    } else {
      throw new TypeException('The result of condition value is not boolean.');
    }
  });

  const next = item ? item.next : task.next;

  return {
    ...context,
    next,
  };
};
