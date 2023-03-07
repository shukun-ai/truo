import { createBrowserHistory } from 'history';

import { ApiRequester } from './apis/requester';
import { EffectInjector } from './effect.interface';
import { ServerLoader } from './loaders/server-loader';
import { CurrentUserRepository } from './repositories/current-user-repository';
import { RouterRepository } from './repositories/router-repository';
import { CustomRepositoryService } from './repository/custom-repository-service';
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
  const customRepositoryService = new CustomRepositoryService(
    repositoryManager,
  );

  const CURRENT_USER_REPOSITORY_KEY = 'currentUser';
  const ROUTER_REPOSITORY_KEY = 'router';
  repositoryManager.add(CURRENT_USER_REPOSITORY_KEY, currentUserRepository);
  repositoryManager.add(ROUTER_REPOSITORY_KEY, routerRepository);

  const router = routerRepository.getValue();
  const definitions = await loader.load(router.orgName, router.app);

  const injector: EffectInjector = {
    authStorage,
    apiRequester,
    loader,
    repositoryManager,
    customRepositoryService,
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
