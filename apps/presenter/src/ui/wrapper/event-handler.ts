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
  const { convertor } = event;
  const value = parseTemplate(convertor, context);
  // eslint-disable-next-line no-console
  console.log('changed value', value);
};

const parseTemplate = (
  template: string,
  context: EventHandlerContext,
): unknown => {
  return context.templateService.run(template, context.states, context.helpers);
};
