import { createRoot } from 'react-dom/client';

import { initializeApi } from './effect/api/api';
import { initializeAuth } from './effect/auth/auth';
import { initializeDevtool } from './effect/devtool/devtool';
import { initializeRouter } from './effect/router/router';
import { initializeStore } from './effect/store/store';
import { environments } from './environments/environment';
import { ObservableApp } from './observable/observable-app';

const devtool = initializeDevtool(environments);
const store = initializeStore(environments, devtool);

const api = initializeApi(environments, devtool, store);
const auth = initializeAuth(environments, devtool, store);
const router = initializeRouter(environments, devtool, store);

const domNode = document.getElementById('root');

if (!domNode) {
  throw new Error('Did not find root domNode.');
}

const root = createRoot(domNode);

root.render(
  <ObservableApp
    injector={{
      environments,
      devtool,
      store,
      api,
      auth,
      router,
    }}
    render={(app) => <div>hi</div>}
  />,
);
