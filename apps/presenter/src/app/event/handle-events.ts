import { TypeException } from '@shukun/exception';
import { Injector, Repository } from '@shukun/presenter/definition';
import { CodeMode, PresenterEvent, PresenterSchema } from '@shukun/schema';

import { StandardState } from '../../interfaces/app';
import { runTemplate } from '../template/template';

export const handleEvents = (
  events: PresenterEvent[],
  state: StandardState,
  injector: Injector,
  presenter: PresenterSchema,
  repositories: Record<string, Repository>,
): void => {
  for (const event of events) {
    handleEvent(event, state, injector, presenter, repositories);
  }
};

const handleEvent = (
  event: PresenterEvent,
  state: StandardState,
  injector: Injector,
  presenter: PresenterSchema,
  repositories: Record<string, Repository>,
): void => {
  const { action, target, value } = event;

  const repository = presenter.repositories[target];

  if (!repository) {
    throw new TypeException(
      'The repository is not defined, target is {{target}}',
      {
        target,
      },
    );
  }

  const repositoryCallback = repositories[repository.type];

  if (!repositoryCallback) {
    throw new TypeException(
      'The repository definition is not defined, type is {{type}}',
      {
        type: repository.type,
      },
    );
  }

  if (!(action in repositoryCallback)) {
    throw new TypeException(
      'The repository did not has specific action, action is {{action}} and target is {{target}}',
      {
        action,
        target,
      },
    );
  }

  const template = value ? value : `${CodeMode.JS}return $.payload`;
  const parsedValue = runTemplate(template, state);

  const callback = repositoryCallback[action];
  callback(parsedValue, event, injector, repository);
};
