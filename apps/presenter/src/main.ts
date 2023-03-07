import { createElement } from 'react';
import { render } from 'react-dom';

import { createApp } from './controllers/entry';

import { injector } from './injector';

async function main() {
  // const appController = new AppController(injector);
  // await appController.registerRepositories();

  render(createElement(createApp(injector)), document.getElementById('root'));

  setTimeout(() => {
    injector.repositoryManager.setValue('form1', ['deviceNumber'], 'Bob');
  }, 3000);
}

main();
