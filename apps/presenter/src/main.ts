import { createElement } from 'react';
import { createRoot } from 'react-dom/client';

import { createBrowserEffect } from './effects/browser-effect-injector';

import { createObservable } from './observable/observable';
import { createObservableApp } from './observable/observable-app';

async function main() {
  const injector = await createBrowserEffect();
  const observable = createObservable(injector);

  const domNode = document.getElementById('root');

  if (!domNode) {
    throw new Error('Did not find root domNode.');
  }

  const root = createRoot(domNode);

  root.render(createElement(createObservableApp(observable)));
}

main();
