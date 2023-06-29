import {
  IApiRequester,
  IEventManager,
  IRepositoryManager,
  IStore,
  IWatchManager,
} from '@shukun/widget';

import { ITemplateService } from '@shukun/widget';

import { ConfigDefinitions, ILoader } from '@shukun/widget-react';

export type EffectInjector = {
  apiRequester: IApiRequester;
  loader: ILoader;
  store: IStore;
  repositoryManager: IRepositoryManager;
  watchManager: IWatchManager;
  eventManager: IEventManager;
  templateService: ITemplateService;
  definitions: ConfigDefinitions;
};
