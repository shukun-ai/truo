import { Injector } from '@shukun/presenter/definition';
import { createBrowserHistory } from 'history';

import { Router } from './internal/router';

export const initializeRouter = (
  environments: Injector['environments'],
  devtool: Injector['devtool'],
  store: Injector['store'],
): Injector['router'] => {
  const history = createBrowserHistory();
  const router = new Router(store, history);
  return router;
};
