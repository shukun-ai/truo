// import { createBrowserHistory } from 'history';
// import { createElement } from 'react';
// import { render } from 'react-dom';

// import { ApiRequester } from './apis/requester';

// import App from './app/app';
// import { RouterRepository } from './controller/repositories/router-repository';
// import { ConfigManager } from './loaders/config-manager';
// import { ServerLoader } from './loaders/server-loader';
// import { AuthStorage } from './storages/auth-storage';

// async function startReactRender() {
//   const authStorage = new AuthStorage();
//   const apiRequester = new ApiRequester(authStorage);
//   const history = createBrowserHistory();
//   const routerRepository = new RouterRepository(history);
//   const loader = new ServerLoader(apiRequester);
//   const configManager = new ConfigManager();

//   const { orgName, app } = routerRepository.getValue();
//   const configuration = await loader.load(orgName, app);
//   await configManager.register(configuration);
//   console.log('configuration', configuration);

//   render(createElement(App), document.getElementById('root'));
// }

// startReactRender();

import { createBrowserHistory } from 'history';

import { ApiRequester } from './apis/requester';

import { AppController } from './controller/app-controller';
import { CurrentUserRepository } from './controller/repositories/current-user-repository';
import { RouterRepository } from './controller/repositories/router-repository';
import { EventQueue } from './event/event-queue';
import { ConfigManager } from './loaders/config-manager';
import { ServerLoader } from './loaders/server-loader';
import { RepositoryManager } from './repository/repository-manager';
import { AuthStorage } from './storages/auth-storage';
import { TemplateService } from './template/template-service';

class Main {
  async start() {
    const authStorage = new AuthStorage();
    const apiRequester = new ApiRequester(authStorage);
    const history = createBrowserHistory();
    const routerRepository = new RouterRepository(history);
    const loader = new ServerLoader(apiRequester);
    const configManager = new ConfigManager();
    const templateService = new TemplateService();
    const currentUserRepository = new CurrentUserRepository();
    const repositoryManager = new RepositoryManager();
    const eventQueue = new EventQueue(repositoryManager);

    const appController = new AppController(
      authStorage,
      apiRequester,
      loader,
      configManager,
      repositoryManager,
      eventQueue,
      templateService,
    );

    appController.registerRouterRepository(routerRepository);
    appController.registerCurrentUserRepository(currentUserRepository);

    const root = document.getElementById('root');
    if (!root) {
      throw new Error();
    }
    appController.mountApp(root);

    setTimeout(() => {
      repositoryManager.setValue('form1', ['deviceNumber'], 'Bob');
      // repositoryManager.setValue('form1', ['value'], { name: 'Bob' });
      // repositoryManager.setValue('router', ['page'], 'about');
      // repositoryManager.trigger('router', { page: 'about' });
    }, 3000);
  }
}

new Main().start();
