import { IRepositoryManager } from '@shukun/widget';

import { ITemplateService } from '@shukun/widget';

import { IApiRequester } from './apis/requester.interface';
import { IEventQueue } from './event/event-queue.interface';
import { ConfigDefinitions, ILoader } from './loaders/loader.interface';
import { CurrentUserRepository } from './repositories/current-user-repository';
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
  currentUserRepository: CurrentUserRepository;
  definitions: ConfigDefinitions;
};
