import { HandlerContext } from '@shukun/connector/handler';
import {
  eitherTask,
  messageTask,
  parallelTask,
  repeatTask,
  transformerTask,
} from '@shukun/connector/task';
import { executeConnector } from '@shukun/connector/web-runtime';
import { Injector } from '@shukun/presenter/definition';
import { PresenterEvent, PresenterSchema, TaskSchema } from '@shukun/schema';

import { StandardState } from '../../interfaces/app';
import { taskHandlers } from '../tasks/task-handlers';

export const handleEvent = (
  event: PresenterEvent,
  state: StandardState,
  injector: Injector,
  presenter: PresenterSchema,
): void => {
  if (!presenter.processes) {
    console.warn('Did not configure processes');
    return;
  }

  const process = presenter.processes[event.process];

  if (!process) {
    console.warn('Did not configure specific process: {{event.process}}', {
      process: event.process,
    });
    return;
  }

  const context: HandlerContext = {
    input: {}, // TODO should get the payload from event
    next: process.start,
    index: 0,
    env: {}, // TODO should get env from API when initialized
    temps: {},
    params: { ...state },
    orgName: state.router.orgName,
    operatorId: state.auth.current?.userId,
    accessToken: state.auth.current?.accessToken,
  };

  const taskDefinitions: Record<string, TaskSchema> = {
    either: eitherTask,
    parallel: parallelTask,
    repeat: repeatTask,
    transformer: transformerTask,
    message: messageTask,
  };

  executeConnector(context, process, taskDefinitions, taskHandlers).then(
    () => undefined,
  );
};
