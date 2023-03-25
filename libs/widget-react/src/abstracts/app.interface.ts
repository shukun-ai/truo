import { PresenterSchema } from '@shukun/schema';

import { IRepositoryManager } from '@shukun/widget';

import { ITemplateService } from '@shukun/widget';

import { ReactWidgets, WidgetDefinitions } from './loader.interface';

export type AppProps = {
  context: {
    appName: string;
    orgName: string;
  };
  router: {
    page: string;
    search: Record<string, unknown>;
  };
  presenter: PresenterSchema;
  reactWidgets: ReactWidgets;
  widgetDefinitions: WidgetDefinitions;
  states: {
    [repositoryId: string]: unknown;
  };
  templateService: ITemplateService;
  repositoryManager: IRepositoryManager;
};
