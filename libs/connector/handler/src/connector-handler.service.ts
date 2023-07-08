import { Injectable } from '@nestjs/common';
import { TypeException } from '@shukun/exception';

import { ConnectorTask } from '@shukun/schema';

import { handleChoiceTask } from './internal/handle-choice-task';
import { handleParallelTask } from './internal/handle-parallel-task';
import { handleRepeatTask } from './internal/handle-repeat-task';
import { handleResourceTask } from './internal/handle-resource-task';
import { handleTransformerTask } from './internal/handle-transformer-task';
import { HandlerContext } from './internal/types';

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

    // handle next task
    const newContext = await this.handleTask(nextTask, context);

    return this.execute(newContext);
  }

  async handleTask(
    task: ConnectorTask,
    context: HandlerContext,
  ): Promise<HandlerContext> {
    switch (task.type) {
      case 'choice':
        return handleChoiceTask(task, context);
      case 'parallel':
        return handleParallelTask(task, context);
      case 'repeat':
        return handleRepeatTask(task, context);
      case 'transformer':
        return handleTransformerTask(task, context);
      default:
        return handleResourceTask(task, context);
    }
  }
}
