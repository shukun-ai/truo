import { HandlerContext } from '@shukun/connector/handler';
import { executeConnector } from '@shukun/connector/web-runtime';
import { Injector } from '@shukun/presenter/definition';
import { PresenterEvent, PresenterSchema, TaskSchema } from '@shukun/schema';

import { StandardState } from '../../interfaces/app';
import { taskHandlers } from '../tasks/task-handlers';
import { runTemplate } from '../template/template';

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

  const payload = runTemplate(event.value, state);

  const context: HandlerContext = {
    input: payload,
    next: process.start,
    index: 0,
    env: {}, // TODO should get env from API when initialized
    temps: {},
    params: { ...state, payload },
    orgName: state.router.orgName,
    operatorId: state.auth.current?.userId,
    accessToken: state.auth.current?.accessToken,
  };

  // @remark pass empty taskDefinitions because the tasks is built-in in presenter runtime
  const taskDefinitions: Record<string, TaskSchema> = {
    //
  };

  executeConnector(context, process, taskDefinitions, taskHandlers).then(
    () => undefined,
  );
};
