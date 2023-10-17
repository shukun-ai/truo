import { TypeException } from '@shukun/exception';

import { ConnectorTask } from '@shukun/schema';

import { internalHandlerMaps } from './handlers-map';
import { handleResourceTask } from './internal/handle-resource-task';
import { parseParameters } from './template/template';
import { HandlerContext } from './types';

export const execute = async (
  context: HandlerContext,
): Promise<HandlerContext> => {
  const current = context.next;

  if (!current) {
    return context;
  }

  const nextTask = context.connector.tasks[current];

  if (!nextTask) {
    throw new TypeException('Did not find the specific task: {{task}}', {
      task: current,
    });
  }

  // @remark: handle next task
  const newContext = await handleTask(
    {
      ...nextTask,
      parameters: parseParameters(nextTask.parameters, context) as Record<
        string,
        unknown
      >,
    },
    {
      ...context,
      executeTask: execute,
    },
  );

  return execute(newContext);
};

const handleTask = async (
  task: ConnectorTask,
  context: HandlerContext,
): Promise<HandlerContext> => {
  if (internalHandlerMaps[task.type]) {
    const handleInternalTask = internalHandlerMaps[task.type];
    return await handleInternalTask(task, context);
  } else if (Object.keys(context.taskDefinitions).includes(task.type)) {
    return await handleResourceTask(task, context);
  } else {
    throw new TypeException(
      'We did not support the specific task type: {{type}}',
      { type: task.type },
    );
  }
};
