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
