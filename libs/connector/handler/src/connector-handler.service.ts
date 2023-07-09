import { Injectable } from '@nestjs/common';
import { TypeException } from '@shukun/exception';

import { ConnectorTask } from '@shukun/schema';

import { handleChoiceTask } from './internal/handle-choice-task';
import { handleResourceTask } from './internal/handle-resource-task';
import { handleTransformerTask } from './internal/handle-transformer-task';
import { parseParameters } from './template/template';
import { HandlerContext, ParallelParameters, RepeatParameters } from './types';

@Injectable()
export class ConnectorHandlerService {
  async execute(context: HandlerContext): Promise<HandlerContext> {
    if (!context.next) {
      return context;
    }

    const nextTask = context.connector.tasks[context.next];

    if (!nextTask) {
      throw new TypeException('Did not find the specific task: {{task}}', {
        task: nextTask,
      });
    }

    // @remark: handle next task
    const newContext = await this.handleTask(
      {
        ...nextTask,
        parameters: parseParameters(nextTask.parameters, context) as Record<
          string,
          unknown
        >,
      },
      context,
    );

    return this.execute(newContext);
  }

  async handleTask(
    task: ConnectorTask,
    context: HandlerContext,
  ): Promise<HandlerContext> {
    switch (task.type) {
      case 'transformer':
        return handleTransformerTask(task, context);
      case 'choice':
        return handleChoiceTask(task, context);
      case 'parallel':
        return await this.handleParallelTask(task, context);
      case 'repeat':
        return await this.handleRepeatTask(task, context);
      default:
        return await handleResourceTask(task, context);
    }
  }

  async handleParallelTask(
    task: ConnectorTask,
    context: HandlerContext,
  ): Promise<HandlerContext> {
    const { branches } = task.parameters as ParallelParameters;

    const branchesPromise = branches.map(async (branch, index) => {
      const computedContext = await this.execute({
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
    };
  }

  async handleRepeatTask(
    task: ConnectorTask,
    context: HandlerContext,
  ): Promise<HandlerContext> {
    const { start, repeatCount } = task.parameters as RepeatParameters;
    const outputArray: unknown[] = [];

    if (typeof repeatCount !== 'number') {
      throw new TypeException('repeatCount is not a number.');
    }

    if (repeatCount > 1000) {
      throw new TypeException('Did not support repeatCount greater than 1000.');
    }

    for (let index = 0; index < repeatCount; index++) {
      const { input: output } = await this.execute({
        ...context,
        next: start,
        index,
      });
      outputArray.push(output);
    }

    return {
      ...context,
      input: outputArray,
    };
  }
}
