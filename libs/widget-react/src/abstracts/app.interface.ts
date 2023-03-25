import { PresenterSchema } from '@shukun/schema';

import { IRepositoryManager, TemplateEvaluateHelpers } from '@shukun/widget';

import { ITemplateService } from '@shukun/widget';

import { ReactWidgets, WidgetDefinitions } from './loader.interface';

export type AppProps = {
  context: {
    appName: string;
    orgName: string;
    screen: string;
    search: Record<string, unknown>;
  };
  rawStates: {
    [repositoryId: string]: unknown;
  };
  containerId: string | null;
  states: {
    [stateId: string]: unknown;
  };
  helpers: TemplateEvaluateHelpers;
  presenter: PresenterSchema;
  reactWidgets: ReactWidgets;
  widgetDefinitions: WidgetDefinitions;
  templateService: ITemplateService;
  repositoryManager: IRepositoryManager;
};
