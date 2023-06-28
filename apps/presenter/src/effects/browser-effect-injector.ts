import { TypeException } from '@shukun/exception';
import { PresenterContainer } from '@shukun/schema';
import {
  IApiRequester,
  IRepositoryManager,
  IStore,
  RepositoryFactoryContext,
} from '@shukun/widget';
import { ConfigDefinitions } from '@shukun/widget-react';
import { createBrowserHistory } from 'history';

import { ApiRequester } from './apis/requester';
import { EffectInjector } from './effect-injector.interface';
import { EventManager } from './event/event-manager';
import { ServerLoader } from './loaders/server-loader';
import { AuthRepository } from './repositories/auth-repository';
import { RouterRepository } from './repositories/router-repository';
import { RepositoryManager } from './repository/repository-manager';
import { AuthStorage } from './storages/auth-storage';
import { Store } from './store/store';
import { TemplateService } from './template/template-service';
import { WatchManager } from './watch/watch-manager';

export const createBrowserEffect = async () => {
  const store = new Store();
  const history = createBrowserHistory();
  const authStorage = new AuthStorage();
  const routerRepository = new RouterRepository(history);
  const authRepository = new AuthRepository(authStorage);
  const repositoryManager = new RepositoryManager();
  const templateService = new TemplateService();
  const apiRequester = new ApiRequester(authRepository);
  const loader = new ServerLoader(apiRequester);

  const router = routerRepository.getValue();
  const definitions = await loader.load(
    router.orgName,
    router.app,
    router.mode,
  );

  // TODO use repository register table instead
  repositoryManager.registerAuthRepository(authRepository);
  repositoryManager.registerRouterRepository(routerRepository);
  registerContainers(store, apiRequester, repositoryManager, definitions);

  const eventManager = new EventManager({
    repositoryManager,
    templateService,
    helpers: {},
    apiRequester,
  });

  const watchManager = new WatchManager(eventManager);

  const injector: EffectInjector = {
    authStorage,
    apiRequester,
    loader,
    store,
    repositoryManager,
    templateService,
    watchManager,
    eventManager,
    routerRepository,
    authRepository,
    definitions,
  };

  return injector;
};

const registerContainers = (
  store: IStore,
  apiRequester: IApiRequester,
  repositoryManager: IRepositoryManager,
  definitions: ConfigDefinitions,
) => {
  for (const [containerId, container] of Object.entries(
    definitions.presenter.containers,
  )) {
    registerContainer(
      store,
      apiRequester,
      repositoryManager,
      definitions,
      containerId,
      container,
    );
  }
};

const registerContainer = (
  store: IStore,
  apiRequester: IApiRequester,
  repositoryManager: IRepositoryManager,
  definitions: ConfigDefinitions,
  containerId: string,
  container: PresenterContainer,
): void => {
  for (const [repositoryId, definition] of Object.entries(
    container.repositories,
  )) {
    const RepositoryClass = definitions.reactRepositories[definition.type];

    if (!RepositoryClass) {
      console.error(
        new TypeException('We did not support this repository type, {{type}}', {
          type: definition.type,
        }),
      );
      return;
    }

    const repositoryFactoryContext: RepositoryFactoryContext = {
      containerId,
      repositoryId,
      definition,
      store,
      apiRequester,
    };

    repositoryManager.register(
      { scope: 'container', containerId, repositoryId },
      new RepositoryClass(repositoryFactoryContext),
    );
  }
};
