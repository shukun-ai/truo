import { IApiRequester, IRepositoryManager } from '@shukun/widget';

import { ITemplateService } from '@shukun/widget';

import { ConfigDefinitions, ILoader } from '@shukun/widget-react';

import { IEventQueue } from './event/event-queue.interface';
import { AuthRepository } from './repositories/auth-repository';
import { RouterRepository } from './repositories/router-repository';
import { IAuthStorage } from './storages/auth-storage.interface';

export type EffectInjector = {
  authStorage: IAuthStorage;
  apiRequester: IApiRequester;
  loader: ILoader;
  repositoryManager: IRepositoryManager;
  eventQueue: IEventQueue;
  templateService: ITemplateService;
  routerRepository: RouterRepository;
  authRepository: AuthRepository;
  definitions: ConfigDefinitions;
};
