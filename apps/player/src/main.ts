import { createBrowserHistory } from 'history';

import { ApiRequester } from './apis/requester';

import { ConfigManager } from './config/config-manager';
import { AppController } from './controller/app-controller';
import { CurrentUserRepository } from './controller/repositories/current-user-repository';
import { RouterRepository } from './controller/repositories/router-repository';
import { EventQueue } from './event/event-queue';
import { ServerLoader } from './loader/server-loader';
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

    const pageController = new AppController(
      authStorage,
      apiRequester,
      loader,
      configManager,
      repositoryManager,
      eventQueue,
      templateService,
    );

    pageController.registerRouterRepository(routerRepository);
    pageController.registerCurrentUserRepository(currentUserRepository);

    const root = document.getElementById('root');
    if (!root) {
      throw new Error();
    }
    pageController.mountApp(root);

    setTimeout(() => {
      repositoryManager.setValue('form1', ['deviceNumber'], 'Bob');
      // repositoryManager.setValue('form1', ['value'], { name: 'Bob' });
      // repositoryManager.setValue('router', ['page'], 'about');
      // repositoryManager.trigger('router', { page: 'about' });
    }, 3000);
  }
}

new Main().start();
