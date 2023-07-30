import {
  IApiRequester,
  IEventManager,
  IRepositoryManager,
  IStore,
  IWatchManager,
  RouterMode,
  TemplateEvaluateHelpers,
} from '@shukun/presenter/definition';

import { ITemplateService } from '@shukun/presenter/definition';
import { PresenterSchema } from '@shukun/schema';

import { ReactWidgets } from './loader.interface';

export type AppProps = {
  context: {
    debug: boolean;
    appName: string;
    orgName: string;
    screen: string;
    search: Record<string, unknown>;
    mode: RouterMode;
  };
  rawStates: Record<string, unknown>;
  containerId: string | null;
  showSignInScreen: boolean;
  states: {
    [stateId: string]: unknown;
  };
  store: IStore;
  helpers: TemplateEvaluateHelpers;
  presenter: PresenterSchema;
  reactWidgets: ReactWidgets;
  templateService: ITemplateService;
  repositoryManager: IRepositoryManager;
  watchManager: IWatchManager;
  eventManager: IEventManager;
  api: IApiRequester;
};
