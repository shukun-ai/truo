import { TypeException } from '@shukun/exception';
import { ConnectorTask, TaskSchema } from '@shukun/schema';

export const getDefinition = (
  task: ConnectorTask,
  taskDefinitions: Record<string, TaskSchema>,
) => {
  const definition = taskDefinitions[task.type];

  if (!definition) {
    throw new TypeException('Did not find task definition.');
  }

  return definition;
};
