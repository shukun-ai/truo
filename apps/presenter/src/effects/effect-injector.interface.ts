import {
  IApiRequester,
  IEventManager,
  IRepositoryManager,
  IStore,
  IWatchManager,
} from '@shukun/presenter/definition';

import { ITemplateService } from '@shukun/presenter/definition';
import { ConfigDefinitions, ILoader } from '@shukun/presenter/widget-react';

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
