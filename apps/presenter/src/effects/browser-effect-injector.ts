import { TypeException } from '@shukun/exception';
import {
  IApiRequester,
  IRepositoryManager,
  IStore,
  RepositoryContext,
} from '@shukun/presenter/definition';
import {
  AuthRepository,
  ConfigDefinitions,
  RouterRepository,
} from '@shukun/presenter/widget-react';
import { PresenterContainer } from '@shukun/schema';
import { createBrowserHistory } from 'history';

import { ApiRequester } from './apis/requester';
import { EffectInjector } from './effect-injector.interface';
import { EventManager } from './event/event-manager';
import { ServerLoader } from './loaders/server-loader';
import { RepositoryManager } from './repository/repository-manager';
import { StorageManager } from './storages/storage-manager';
import { Store } from './store/store';
import { TemplateService } from './template/template-service';
import { WatchManager } from './watch/watch-manager';

export const createBrowserEffect = async () => {
  const store = new Store();
  const history = createBrowserHistory();
  const storageManager = new StorageManager(store);
  const apiRequester = new ApiRequester(store);
  const routerRepository = new RouterRepository(
    {
      type: 'app',
      containerId: null,
      repositoryId: 'router',
      definition: { type: 'router', parameters: {} },
      store,
      apiRequester,
    },
    history,
  );
  const authRepository = new AuthRepository({
    type: 'app',
    containerId: null,
    repositoryId: 'auth',
    definition: { type: 'auth', parameters: {} },
    store,
    apiRequester,
  });
  const repositoryManager = new RepositoryManager();
  const templateService = new TemplateService();
  const loader = new ServerLoader(apiRequester);

  const router = routerRepository.getValue();
  const definitions = await loader.load(
    router.orgName,
    router.app,
    router.mode,
  );

  storageManager.register();

  // TODO use repository register table instead
  repositoryManager.registerAuthRepository(authRepository);
  repositoryManager.registerRouterRepository(routerRepository);
  registerContainers(store, apiRequester, repositoryManager, definitions);

  const eventManager = new EventManager({
    store,
    repositoryManager,
    templateService,
    helpers: {},
    apiRequester,
  });

  const watchManager = new WatchManager(store, eventManager);

  const injector: EffectInjector = {
    apiRequester,
    loader,
    store,
    repositoryManager,
    templateService,
    watchManager,
    eventManager,
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

    const repositoryFactoryContext: RepositoryContext = {
      type: 'container',
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
