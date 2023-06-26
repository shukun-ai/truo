import { TypeException } from '@shukun/exception';
import { PresenterEvent } from '@shukun/schema';

import { CODE_MODE_JS_PREFIX, EventHandlerContext } from '@shukun/widget';

import { extractContainerState } from '../../utils/extract-container-state';

export const handleEvent = (
  event: PresenterEvent,
  context: EventHandlerContext,
): void => {
  const { containerId } = context;
  const { action, target, scope, value } = event;

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

  const allState = context.repositoryManager.getValue();

  const containerState = extractContainerState(allState, containerId);

  const states = {
    ...containerState,
    index: context.states['index'],
    item: context.states['item'],
    payload: context.states['payload'],
  };

  const template = value ? value : `${CODE_MODE_JS_PREFIX}return $.payload`;
  const payload = context.templateService.run(
    template,
    states,
    context.helpers,
  );

  // eslint-disable-next-line security/detect-object-injection, @typescript-eslint/no-explicit-any
  const callback = (repository as any)[action];
  callback.apply(repository, [event, payload] as [PresenterEvent, unknown]);
};
