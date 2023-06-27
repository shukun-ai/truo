import { PresenterSchema } from '@shukun/schema';

import {
  IApiRequester,
  IEventManager,
  IRepositoryManager,
  IWatchManager,
  RouterMode,
  TemplateEvaluateHelpers,
} from '@shukun/widget';

import { ITemplateService } from '@shukun/widget';

import { ReactWidgets, WidgetDefinitions } from './loader.interface';

export type AppProps = {
  context: {
    debug: boolean;
    appName: string;
    orgName: string;
    screen: string;
    search: Record<string, unknown>;
    mode: RouterMode;
  };
  rawStates: {
    [repositoryId: string]: unknown;
  };
  containerId: string | null;
  showSignInScreen: boolean;
  states: {
    [stateId: string]: unknown;
  };
  helpers: TemplateEvaluateHelpers;
  presenter: PresenterSchema;
  reactWidgets: ReactWidgets;
  widgetDefinitions: WidgetDefinitions;
  templateService: ITemplateService;
  repositoryManager: IRepositoryManager;
  watchManager: IWatchManager;
  eventManager: IEventManager;
  api: IApiRequester;
};
