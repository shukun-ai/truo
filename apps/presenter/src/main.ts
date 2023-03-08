import { createElement } from 'react';
import { render } from 'react-dom';

import { createBrowserEffect } from './effects/browser-effect-injector';

import { createObservable } from './observable/observable';
import { createObservableApp } from './observable/observable-app';

async function main() {
  const injector = await createBrowserEffect();
  const observable = createObservable(injector);

  render(
    createElement(createObservableApp(observable)),
    document.getElementById('root'),
  );
}

main();
