import { createBrowserHistory } from 'history';

import { ConfigManager } from './config/config-manager';
import { PageController } from './controller/page-controller';
import { CurrentUserRepository } from './controller/repositories/current-user-repository';
import { RouterRepository } from './controller/repositories/router-repository';
import { EventQueue } from './event/event-queue';
import { LocalLoader } from './integrate-testing/local-loader';
import { RepositoryManager } from './repository/repository-manager';
import { TemplateService } from './template/template-service';

class Main {
  async start() {
    const history = createBrowserHistory();
    const loader = new LocalLoader();
    const definitions = await loader.load();
    const configManager = new ConfigManager(definitions);
    const templateService = new TemplateService();
    const routerRepository = new RouterRepository(history);
    const currentUserRepository = new CurrentUserRepository();
    const repositoryManager = new RepositoryManager();
    const eventQueue = new EventQueue(repositoryManager);

    const pageController = new PageController(
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
    }, 3000);
  }
}

new Main().start();
