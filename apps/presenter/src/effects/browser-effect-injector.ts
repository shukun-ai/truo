import { TypeException } from '@shukun/exception';
import {
  IApiRequester,
  IAuth,
  IRepositoryManager,
  IRouter,
  IStore,
  RepositoryContext,
} from '@shukun/presenter/definition';
import { ConfigDefinitions } from '@shukun/presenter/widget-react';
import { PresenterContainer } from '@shukun/schema';
import { createBrowserHistory } from 'history';

import { selectRouter } from '../selectors/router-selector';

import { ApiRequester } from './apis/requester';
import { Auth } from './auth/auth';
import { EffectInjector } from './effect-injector.interface';
import { EventManager } from './event/event-manager';
import { ServerLoader } from './loaders/server-loader';
import { RepositoryManager } from './repository/repository-manager';
import { Router } from './router/router';
import { Store } from './store/store';
import { TemplateService } from './template/template-service';
import { WatchManager } from './watch/watch-manager';

export const createBrowserEffect = async () => {
  const store = new Store();
  const history = createBrowserHistory();
  const auth = new Auth(store);
  const router = new Router(store, history);
  const apiRequester = new ApiRequester(store);
  const repositoryManager = new RepositoryManager();
  const templateService = new TemplateService();
  const loader = new ServerLoader(apiRequester);

  const routerState = selectRouter(store);
  const definitions = await loader.load(
    routerState.orgName,
    routerState.app,
    routerState.mode,
  );

  registerContainers(
    store,
    apiRequester,
    repositoryManager,
    definitions,
    auth,
    router,
  );

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
    auth,
    router,
  };

  return injector;
};

const registerContainers = (
  store: IStore,
  apiRequester: IApiRequester,
  repositoryManager: IRepositoryManager,
  definitions: ConfigDefinitions,
  auth: IAuth,
  router: IRouter,
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
      auth,
      router,
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
  auth: IAuth,
  router: IRouter,
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
      auth,
      router,
    };

    repositoryManager.register(
      { scope: 'container', containerId, repositoryId },
      new RepositoryClass(repositoryFactoryContext),
    );
  }
};
