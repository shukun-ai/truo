import { createBrowserHistory } from 'history';

import { ApiRequester } from './apis/requester';
import { IApiRequester } from './apis/requester.interface';
import { CurrentUserRepository } from './repositories/current-user-repository';
import { RouterRepository } from './repositories/router-repository';
import { EventQueue } from './event/event-queue';
import { IEventQueue } from './event/event-queue.interface';
import { ConfigManager } from './loaders/config-manager';
import { IConfigManager } from './loaders/config-manager.interface';
import { ILoader } from './loaders/loader.interface';
import { ServerLoader } from './loaders/server-loader';
import { RepositoryManager } from './repository/repository-manager';
import { IRepositoryManager } from './repository/repository-manager.interface';
import { AuthStorage } from './storages/auth-storage';
import { IAuthStorage } from './storages/auth-storage.interface';
import { TemplateService } from './template/template-service';
import { ITemplateService } from './template/template-service.interface';

const authStorage = new AuthStorage();
const apiRequester = new ApiRequester(authStorage);
const history = createBrowserHistory();
const routerRepository = new RouterRepository(history);
const loader = new ServerLoader(apiRequester);
const configManager = new ConfigManager();
const templateService = new TemplateService();
const currentUserRepository = new CurrentUserRepository();
const repositoryManager = new RepositoryManager();
const eventQueue = new EventQueue(repositoryManager);

export type Injector = {
  authStorage: IAuthStorage;
  apiRequester: IApiRequester;
  loader: ILoader;
  configManager: IConfigManager;
  repositoryManager: IRepositoryManager;
  eventQueue: IEventQueue;
  templateService: ITemplateService;
  routerRepository: RouterRepository;
  currentUserRepository: CurrentUserRepository;
};

export const injector: Injector = {
  authStorage,
  apiRequester,
  loader,
  configManager,
  repositoryManager,
  eventQueue,
  templateService,
  routerRepository,
  currentUserRepository,
};
