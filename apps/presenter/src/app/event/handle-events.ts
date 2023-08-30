import { TypeException } from '@shukun/exception';
import { Injector, Repository } from '@shukun/presenter/definition';
import { CodeMode, PresenterEvent, PresenterSchema } from '@shukun/schema';

import { runTemplate } from '../template/template';

export type EventState = {
  index: number;
  item: unknown;
  payload: unknown;
  state: unknown;
};

export const handleEvents = (
  events: PresenterEvent[],
  state: EventState,
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
  state: EventState,
  injector: Injector,
  presenter: PresenterSchema,
  repositories: Record<string, Repository>,
): void => {
  const { action, target, value } = event;

  const repositoryDefinition = repositories[target];
  const repository = presenter.repositories[target];

  if (!repositoryDefinition || !repository) {
    throw new TypeException(
      'The repository is not defined, target is {{target}}',
      {
        target,
      },
    );
  }

  if (!(action in repositoryDefinition)) {
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

  const callback = repositoryDefinition[action];
  callback(parsedValue, event, injector, repository);
};
