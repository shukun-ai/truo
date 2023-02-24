import { createMemoryHistory } from 'history';

import { ConfigManager } from '../config/config-manager';
import { PageController } from '../controller/page-controller';
import { CurrentUserRepository } from '../controller/repositories/current-user-repository';
import { RouterRepository } from '../controller/repositories/router-repository';
import { EventQueue } from '../event/event-queue';
import { RepositoryManager } from '../repository/repository-manager';
import { TemplateService } from '../template/template-service';

import { LocalLoader } from './local-loader';

export async function createApp(
  options: { initial: string } = { initial: '/' },
) {
  const history = createMemoryHistory({
    initialEntries: [options.initial],
  });
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

  const root = document.createElement('div');
  document.body.append(root);
  pageController.mountApp(root);

  return {
    history,
    repositoryManager,
    pageController,
    root,
  };
}
