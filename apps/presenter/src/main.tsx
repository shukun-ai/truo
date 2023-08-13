import { createElement } from 'react';
import { createRoot } from 'react-dom/client';

import { initializeApi } from './effect/api/api';
import { initializeDevtool } from './effect/devtool/devtool';
import { initializeStore } from './effect/store/store';
import { environment } from './environments/environment';

const devtool = initializeDevtool(environment);
const store = initializeStore(environment, devtool);

const api = initializeApi(environment, devtool, store);
// const auth = initializeAuth(store);
// const router = initializeBrowserRouter(store);

// const domNode = document.getElementById('root');

// if (!domNode) {
//   throw new Error('Did not find root domNode.');
// }

// const root = createRoot(domNode);

// root.render(
//   <ObservableApp
//     injector={{
//       debugger,
//       store,
//       api,
//       auth,
//       router,
//     }}
//     render={(app) => (<App app={app} />)}
//    />
// );

// async function main() {
//   if (!environment.production) {
//     devTools();
//   }

//   const injector = await createBrowserEffect();
//   const observable = createObservable(injector);

//   const domNode = document.getElementById('root');

//   if (!domNode) {
//     throw new Error('Did not find root domNode.');
//   }

//   const root = createRoot(domNode);

//   root.render(createElement(createObservableApp(observable)));
// }

// main();
