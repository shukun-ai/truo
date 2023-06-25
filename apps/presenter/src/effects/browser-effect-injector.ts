import { TypeException } from '@shukun/exception';
import { PresenterContainer, PresenterSchema } from '@shukun/schema';
import { IRepositoryManager } from '@shukun/widget';
import { createBrowserHistory } from 'history';

import { ApiRequester } from './apis/requester';
import { EffectInjector } from './effect-injector.interface';
import { ServerLoader } from './loaders/server-loader';
import { AuthRepository } from './repositories/auth-repository';
import { RouterRepository } from './repositories/router-repository';
import { SimpleRepository } from './repositories/simple-repository';
import { RepositoryManager } from './repository/repository-manager';
import { AuthStorage } from './storages/auth-storage';
import { TemplateService } from './template/template-service';

export const createBrowserEffect = async () => {
  const history = createBrowserHistory();
  const authStorage = new AuthStorage();
  const routerRepository = new RouterRepository(history);
  const authRepository = new AuthRepository(authStorage);
  const repositoryManager = new RepositoryManager();
  const templateService = new TemplateService();
  const apiRequester = new ApiRequester(authRepository);
  const loader = new ServerLoader(apiRequester);

  const router = routerRepository.getValue();
  const definitions = await loader.load(router.orgName, router.app);

  repositoryManager.registerAuthRepository(authRepository);
  repositoryManager.registerRouterRepository(routerRepository);
  registerContainers(repositoryManager, definitions.presenter);

  const injector: EffectInjector = {
    authStorage,
    apiRequester,
    loader,
    repositoryManager,
    templateService,
    routerRepository,
    authRepository,
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
    // TODO remove switch
    switch (definition.type) {
      case 'simple':
        repositoryManager.register(
          { scope: 'container', containerId, repositoryId },
          new SimpleRepository(definition.defaultValue),
        );
        break;
      default:
        throw new TypeException(
          'We did not support this repository type, {{type}}',
          { type: definition.type },
        );
    }
  }
};
