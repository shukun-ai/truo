import { TypeException } from '@shukun/exception';
import { ConnectorTask } from '@shukun/schema';

import { HandlerContext } from '../types';

export const getDefinition = (task: ConnectorTask, context: HandlerContext) => {
  const definition = context.taskDefinitions[task.type];

  if (!definition) {
    throw new TypeException('Did not find task definition.');
  }

  return definition;
};
