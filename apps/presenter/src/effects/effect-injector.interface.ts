import {
  IApiRequester,
  IEventManager,
  IRepositoryManager,
  IStore,
  IWatchManager,
} from '@shukun/widget';

import { ITemplateService } from '@shukun/widget';

import { ConfigDefinitions, ILoader } from '@shukun/widget-react';

import { AuthRepository } from './repositories/auth-repository';
import { RouterRepository } from './repositories/router-repository';
import { IAuthStorage } from './storages/auth-storage.interface';

export type EffectInjector = {
  authStorage: IAuthStorage;
  apiRequester: IApiRequester;
  loader: ILoader;
  store: IStore;
  repositoryManager: IRepositoryManager;
  watchManager: IWatchManager;
  eventManager: IEventManager;
  templateService: ITemplateService;
  routerRepository: RouterRepository;
  authRepository: AuthRepository;
  definitions: ConfigDefinitions;
};
