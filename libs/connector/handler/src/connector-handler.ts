import { TypeException } from '@shukun/exception';

import { ConnectorTask } from '@shukun/schema';

import { HandlerContext, HandlerInjector } from './connector-types';

export const execute = async (
  context: HandlerContext,
  injector: HandlerInjector,
): Promise<HandlerContext> => {
  const current = context.next;

  if (!current) {
    return context;
  }

  const nextTask = injector.connector.tasks[current];

  if (!nextTask) {
    throw new TypeException('Did not find the specific task: {{task}}', {
      task: current,
    });
  }

  const newInjector: HandlerInjector = {
    ...injector,
    executeTask: execute,
  };

  // @remark: handle next task
  const newContext = await handleTask(
    {
      ...nextTask,
      parameters: injector.parseParameters(
        nextTask.parameters,
        context,
        injector,
      ) as Record<string, unknown>,
    },
    context,
    newInjector,
  );

  return execute(newContext, newInjector);
};

const handleTask = async (
  task: ConnectorTask,
  context: HandlerContext,
  injector: HandlerInjector,
): Promise<HandlerContext> => {
  if (injector.taskHandlers[task.type]) {
    const handleInternalTask = injector.taskHandlers[task.type];
    return await handleInternalTask(task, context, injector);
  } else if (Object.keys(injector.taskDefinitions).includes(task.type)) {
    const defaultTaskType = 'default';
    const handleInternalTask = injector.taskHandlers[defaultTaskType];
    return await handleInternalTask(task, context, injector);
  } else {
    throw new TypeException(
      'We did not support the specific task type: {{type}}',
      { type: task.type },
    );
  }
};
