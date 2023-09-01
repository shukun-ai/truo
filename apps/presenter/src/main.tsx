import { createRoot } from 'react-dom/client';

import { App } from './app/app';
import { initializeApi } from './effect/api/api';
import { initializeAuth } from './effect/auth/auth';
import { initializeDevtool } from './effect/devtool/devtool';
import { initializeLoader } from './effect/loader/loader';
import { initializeLogger } from './effect/logger/logger';
import { initializeRouter } from './effect/router/router';
import { initializeStore } from './effect/store/store';
import { environments } from './environments/environment';
import { IdentityProvider } from './observable/identity-provider';
import { ObservableApp } from './observable/observable-app';
import { ThemeProvider } from './observable/theme-provider';

const devtool = initializeDevtool(environments);
const logger = initializeLogger(environments, devtool);
const store = initializeStore(environments, devtool);
const api = initializeApi(environments, devtool, store);
const loader = initializeLoader(environments, devtool, store, api);
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
      logger,
      store,
      api,
      loader,
      auth,
      router,
    }}
    render={(app) => (
      <ThemeProvider>
        <IdentityProvider {...app}>
          <App {...app} />
        </IdentityProvider>
      </ThemeProvider>
    )}
  />,
);
