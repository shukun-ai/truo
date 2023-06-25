import { TypeException } from '@shukun/exception';
import { PresenterEvent } from '@shukun/schema';

import { IRepositoryManager, TemplateEvaluateHelpers } from '@shukun/widget';

import { ITemplateService } from '@shukun/widget';

import { SimpleRepository } from '../../effects/repositories/simple-repository';
import { SourceQueryRepository } from '../../effects/repositories/source-query-repository';

export type EventHandlerContext = {
  containerId: string;
  repositoryManager: IRepositoryManager;
  templateService: ITemplateService;
  states: Record<string, unknown>;
  helpers: TemplateEvaluateHelpers;
};

export const handleEvent = (
  event: PresenterEvent,
  context: EventHandlerContext,
): void => {
  const repository = context.repositoryManager.get({
    scope: event.scope,
    containerId: context.containerId,
    repositoryId: event.target,
  });

  if (repository instanceof SimpleRepository) {
    return handleSimpleEvent(repository, event, context);
  } else if (repository instanceof SourceQueryRepository) {
    return handleSourceQueryEvent(repository, event, context);
  }
};

const handleSimpleEvent = (
  repository: SimpleRepository,
  event: PresenterEvent,
  context: EventHandlerContext,
): void => {
  const { value, path, action } = event;
  if (action !== 'set') {
    throw new TypeException(
      'Did not support other action for SimpleRepository.: {{action}}',
      {
        action,
      },
    );
  }
  const parsedValue = value
    ? parseTemplate(value, context)
    : getPayload(context);
  repository.setValue(path ?? [], parsedValue);
};

const handleSourceQueryEvent = (
  repository: SourceQueryRepository,
  event: PresenterEvent,
  context: EventHandlerContext,
): void => {
  const { action } = event;
  if (action === 'run') {
    repository.run();
    return;
  }
  throw new TypeException(
    'Did not support other action for SourceQueryRepository: {{action}}' +
      action,
    {
      action,
    },
  );
};

const parseTemplate = (
  template: string,
  context: EventHandlerContext,
): unknown => {
  return context.templateService.run(template, context.states, context.helpers);
};

const getPayload = (context: EventHandlerContext) => {
  return context.states?.['payload'] ?? null;
};
