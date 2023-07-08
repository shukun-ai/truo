import { ConfigDefinitions, ILoader } from '@shukun/presenter/widget-react';
import {
  IApiRequester,
  IEventManager,
  IRepositoryManager,
  IStore,
  IWatchManager,
} from '@shukun/widget';

import { ITemplateService } from '@shukun/widget';

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
