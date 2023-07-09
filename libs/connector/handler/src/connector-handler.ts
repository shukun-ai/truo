import { TypeException } from '@shukun/exception';

import { ConnectorTask } from '@shukun/schema';

import { handleChoiceTask } from './internal/handle-choice-task';
import { handleResourceTask } from './internal/handle-resource-task';
import { handleShukunTask } from './internal/handle-shukun-task';
import { handleTransformerTask } from './internal/handle-transformer-task';
import { parseParameters } from './template/template';
import { HandlerContext, ParallelParameters, RepeatParameters } from './types';

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
    context,
  );

  return execute(newContext);
};

const handleTask = async (
  task: ConnectorTask,
  context: HandlerContext,
): Promise<HandlerContext> => {
  switch (task.type) {
    case 'transformer':
      return handleTransformerTask(task, context);
    case 'choice':
      return handleChoiceTask(task, context);
    case 'parallel':
      return await handleParallelTask(task, context);
    case 'repeat':
      return await handleRepeatTask(task, context);
  }

  if (['sourceQuery'].includes(task.type)) {
    return await handleShukunTask(task, context);
  }

  if (Object.keys(context.taskDefinitions).includes(task.type)) {
    return await handleResourceTask(task, context);
  } else {
    throw new TypeException(
      'We did not support the specific task type: {{type}}',
      { type: task.type },
    );
  }
};

const handleParallelTask = async (
  task: ConnectorTask,
  context: HandlerContext,
): Promise<HandlerContext> => {
  const { branches } = task.parameters as ParallelParameters;

  const branchesPromise = branches.map(async (branch, index) => {
    const computedContext = await execute({
      ...context,
      next: branch.start,
      index,
    });
    return computedContext.input;
  });

  const outputArray = await Promise.all(branchesPromise);

  return {
    ...context,
    input: outputArray,
    next: task.next,
  };
};

const handleRepeatTask = async (
  task: ConnectorTask,
  context: HandlerContext,
): Promise<HandlerContext> => {
  const { start, repeatCount } = task.parameters as RepeatParameters;
  const outputArray: unknown[] = [];

  if (typeof repeatCount !== 'number') {
    throw new TypeException('repeatCount is not a number.');
  }

  if (repeatCount > 1000) {
    throw new TypeException('Did not support repeatCount greater than 1000.');
  }

  for (let index = 0; index < repeatCount; index++) {
    const { input: output } = await execute({
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
