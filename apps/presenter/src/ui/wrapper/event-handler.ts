import { TypeException } from '@shukun/exception';
import {
  PresenterEvent,
  PresenterEventNavigation,
  PresenterEventSetRepository,
} from '@shukun/schema';

import { IRepositoryManager } from '@shukun/widget';

import { ITemplateService } from '@shukun/widget';

export type EventHandlerContext = {
  containerId: string;
  repositoryManager: IRepositoryManager;
  templateService: ITemplateService;
  states: Record<string, unknown>;
};

export const handleEvent = (
  event: PresenterEvent,
  payload: unknown,
  context: EventHandlerContext,
): void => {
  switch (event.action) {
    case 'setRepository':
      return handleSetRepository(event, payload, context);
    case 'navigation':
      return handleNavigation(event, payload, context);
  }

  throw new TypeException('We did not support this event action: {{action}}', {
    action: event.action,
  });
};

const parseTemplate = (
  template: string,
  payload: unknown,
  context: EventHandlerContext,
): unknown => {
  return context.templateService.run(
    template,
    { ...context.states, payload },
    {},
  );
};

const handleSetRepository = (
  event: PresenterEventSetRepository,
  payload: unknown,
  context: EventHandlerContext,
) => {
  const { target, path, convertor } = event;
  const value = convertor
    ? parseTemplate(convertor, payload, context)
    : payload;

  context.repositoryManager.setValue(
    {
      scope: 'container',
      containerId: context.containerId,
      repositoryId: target,
    },
    path,
    value,
  );
};

const handleNavigation = (
  event: PresenterEventNavigation,
  payload: unknown,
  context: EventHandlerContext,
) => {
  const { page, search } = event;

  const parsedPage = parseTemplate(page, payload, context);
  const parsedSearch = search
    ? parseTemplate(search, payload, context)
    : search;

  context.repositoryManager.trigger(
    // TODO: router should be move into constant.
    { scope: 'app', containerId: context.containerId, repositoryId: 'router' },
    {
      action: 'push',
      page: parsedPage,
      search: parsedSearch ? parsedSearch : undefined,
    },
  );
};
