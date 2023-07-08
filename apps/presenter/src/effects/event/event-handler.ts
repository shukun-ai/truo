import { TypeException } from '@shukun/exception';
import {
  CODE_MODE_JS_PREFIX,
  EventManagerContext,
  EventManagerState,
} from '@shukun/presenter/definition';
import { PresenterEvent } from '@shukun/schema';

import { getSyntheticState } from '../store/synthetic-state';

export const handleEvent = (
  event: PresenterEvent,
  context: EventManagerContext,
  eventState: EventManagerState,
): void => {
  const { action, target, scope, value } = event;
  const { containerId, index, item, payload } = eventState;

  if (!containerId) {
    throw new TypeException(
      'Did not find containerId, action is {{action}} and target is {{target}}',
      {
        action,
        target,
      },
    );
  }

  const repository: unknown = context.repositoryManager.get({
    scope: scope,
    containerId,
    repositoryId: target,
  });

  if (typeof repository !== 'object' || repository === null) {
    throw new TypeException(
      'The repository is not a object, action is {{action}} and target is {{target}}',
      {
        action,
        target,
      },
    );
  }

  if (!(action in repository)) {
    throw new TypeException(
      'The repository did not has specific action, action is {{action}} and target is {{target}}',
      {
        action,
        target,
      },
    );
  }

  const allState = context.store.getAllValue();

  const containerState = getSyntheticState(allState, containerId);

  const states = {
    ...containerState,
    index,
    item,
    payload,
  };

  const template = value ? value : `${CODE_MODE_JS_PREFIX}return $.payload`;
  const parsedValue = context.templateService.run(
    template,
    states,
    context.helpers,
  );

  // eslint-disable-next-line security/detect-object-injection, @typescript-eslint/no-explicit-any
  const callback = (repository as any)[action];
  callback.apply(repository, [event, parsedValue] as [PresenterEvent, unknown]);
};
