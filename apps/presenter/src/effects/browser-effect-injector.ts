import { PresenterContainer, PresenterSchema } from '@shukun/schema';
import { IRepositoryManager } from '@shukun/widget';
import { createBrowserHistory } from 'history';

import { ApiRequester } from './apis/requester';
import { EffectInjector } from './effect-injector.interface';
import { EventQueue } from './event/event-queue';
import { ServerLoader } from './loaders/server-loader';
import { CurrentUserRepository } from './repositories/current-user-repository';
import { RouterRepository } from './repositories/router-repository';
import { SimpleRepository } from './repositories/simple-repository';
import { RepositoryManager } from './repository/repository-manager';
import { AuthStorage } from './storages/auth-storage';
import { TemplateService } from './template/template-service';

export const createBrowserEffect = async () => {
  const authStorage = new AuthStorage();
  const apiRequester = new ApiRequester(authStorage);
  const history = createBrowserHistory();
  const routerRepository = new RouterRepository(history);
  const loader = new ServerLoader(apiRequester);
  const templateService = new TemplateService();
  const currentUserRepository = new CurrentUserRepository();
  const repositoryManager = new RepositoryManager();
  const eventQueue = new EventQueue(repositoryManager);

  const CURRENT_USER_REPOSITORY_KEY = 'currentUser';
  const ROUTER_REPOSITORY_KEY = 'router';

  const router = routerRepository.getValue();
  const definitions = await loader.load(router.orgName, router.app);

  repositoryManager.register(
    {
      scope: 'app',
      containerId: 'app',
      repositoryId: CURRENT_USER_REPOSITORY_KEY,
    },
    currentUserRepository,
  );
  repositoryManager.registerRouterRepository(routerRepository);
  registerContainers(repositoryManager, definitions.presenter);

  const injector: EffectInjector = {
    authStorage,
    apiRequester,
    loader,
    repositoryManager,
    eventQueue,
    templateService,
    routerRepository,
    currentUserRepository,
    definitions,
  };

  return injector;
};

const registerContainers = (
  repositoryManager: IRepositoryManager,
  presenter: PresenterSchema,
) => {
  for (const [containerId, container] of Object.entries(presenter.containers)) {
    registerContainer(repositoryManager, containerId, container);
  }
};

const registerContainer = (
  repositoryManager: IRepositoryManager,
  containerId: string,
  container: PresenterContainer,
): void => {
  for (const [repositoryId, definition] of Object.entries(
    container.repositories,
  )) {
    switch (definition.type) {
      case 'Simple':
        repositoryManager.register(
          { scope: 'container', containerId, repositoryId },
          new SimpleRepository(definition),
        );
        break;
    }
  }
};
