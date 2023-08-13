import { createElement } from 'react';
import { createRoot } from 'react-dom/client';

import { environment } from './environments/environment';

// const debugger = initializeDebugger();
// const store = initializeStore(debugger);

// const api = initializeApi(store);
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
