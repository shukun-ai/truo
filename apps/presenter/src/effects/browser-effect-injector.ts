import { PlayerContainer, PlayerSchema } from '@shukun/schema';
import { createBrowserHistory } from 'history';

import { ApiRequester } from './apis/requester';
import { EffectInjector } from './effect-injector.interface';
import { EventQueue } from './event/event-queue';
import { ServerLoader } from './loaders/server-loader';
import { CurrentUserRepository } from './repositories/current-user-repository';
import { RouterRepository } from './repositories/router-repository';
import { SimpleRepository } from './repositories/simple-repository';
import { ThemeRepository } from './repositories/theme-repository';
import { RepositoryManager } from './repository/repository-manager';
import { IRepositoryManager } from './repository/repository-manager.interface';
import { AuthStorage } from './storages/auth-storage';
import { registerReboot } from './styles/register-reboot-styles';
import { TemplateService } from './template/template-service';

export const createBrowserEffect = async () => {
  registerReboot();
  const authStorage = new AuthStorage();
  const apiRequester = new ApiRequester(authStorage);
  const history = createBrowserHistory();
  const routerRepository = new RouterRepository(history);
  const loader = new ServerLoader(apiRequester);
  const themeRepository = new ThemeRepository();
  const templateService = new TemplateService();
  const currentUserRepository = new CurrentUserRepository();
  const repositoryManager = new RepositoryManager();
  const eventQueue = new EventQueue(repositoryManager);

  const THEME_REPOSITORY_KEY = 'theme';
  const CURRENT_USER_REPOSITORY_KEY = 'currentUser';
  const ROUTER_REPOSITORY_KEY = 'router';

  const router = routerRepository.getValue();
  const definitions = await loader.load(router.orgName, router.app);

  repositoryManager.register(
    {
      scope: 'app',
      containerId: 'app',
      repositoryId: THEME_REPOSITORY_KEY,
    },
    themeRepository,
  );
  repositoryManager.register(
    {
      scope: 'app',
      containerId: 'app',
      repositoryId: CURRENT_USER_REPOSITORY_KEY,
    },
    currentUserRepository,
  );
  repositoryManager.register(
    {
      scope: 'app',
      containerId: 'app',
      repositoryId: ROUTER_REPOSITORY_KEY,
    },
    routerRepository,
  );
  registerContainers(repositoryManager, definitions.player);

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
    presenterContext: {
      appName: router.app,
      orgName: router.orgName,
    },
  };

  return injector;
};

const registerContainers = (
  repositoryManager: IRepositoryManager,
  player: PlayerSchema,
) => {
  for (const [containerId, container] of Object.entries(player.containers)) {
    registerContainer(repositoryManager, containerId, container);
  }
};

const registerContainer = (
  repositoryManager: IRepositoryManager,
  containerId: string,
  container: PlayerContainer,
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
