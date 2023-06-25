import { PresenterEvent } from '@shukun/schema';

import { IRepositoryManager, TemplateEvaluateHelpers } from '@shukun/widget';

import { ITemplateService } from '@shukun/widget';

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
  const { value, target, path } = event;
  const parsedValue = value
    ? parseTemplate(value, context)
    : getPayload(context);

  context.repositoryManager.setValue(
    {
      scope: 'container',
      containerId: context.containerId,
      repositoryId: target,
    },
    path ?? [],
    parsedValue,
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
