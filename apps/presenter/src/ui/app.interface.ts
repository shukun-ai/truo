import { PresenterSchema } from '@shukun/schema';

import { WidgetDefinitions } from '../effects/loaders/loader.interface';
import { IRepositoryManager } from '../effects/repository/repository-manager.interface';
import { ITemplateService } from '../effects/template/template-service.interface';

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

export type ReactWidget = (...args: any) => JSX.Element;

export type ReactWidgets = Record<string, ReactWidget>;
