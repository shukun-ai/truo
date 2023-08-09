import { TypeException } from '@shukun/exception';
import {
  IApiRequester,
  IAuth,
  IRepositoryManager,
  IRouter,
  IStore,
  RepositoryContext,
} from '@shukun/presenter/definition';
import { ConfigDefinitions } from '@shukun/presenter/widget-react';
import { PresenterContainer, PresenterSchema } from '@shukun/schema';

export const registerContainers = (
  presenter: PresenterSchema,
  context: {
    store: IStore;
    apiRequester: IApiRequester;
    repositoryManager: IRepositoryManager;
    reactWidgets: ConfigDefinitions['reactWidgets'];
    reactRepositories: ConfigDefinitions['reactRepositories'];
    auth: IAuth;
    router: IRouter;
  },
) => {
  for (const [containerId, container] of Object.entries(presenter.containers)) {
    registerContainer(containerId, container, context);
  }
};

const registerContainer = (
  containerId: string,
  container: PresenterContainer,
  context: {
    store: IStore;
    apiRequester: IApiRequester;
    repositoryManager: IRepositoryManager;
    reactWidgets: ConfigDefinitions['reactWidgets'];
    reactRepositories: ConfigDefinitions['reactRepositories'];
    auth: IAuth;
    router: IRouter;
  },
): void => {
  for (const [repositoryId, definition] of Object.entries(
    container.repositories,
  )) {
    const RepositoryClass = context.reactRepositories[definition.type];

    if (!RepositoryClass) {
      console.error(
        new TypeException('We did not support this repository type, {{type}}', {
          type: definition.type,
        }),
      );
      return;
    }

    const repositoryFactoryContext: RepositoryContext = {
      type: 'container',
      containerId,
      repositoryId,
      definition,
      store: context.store,
      apiRequester: context.apiRequester,
      auth: context.auth,
      router: context.router,
    };

    context.repositoryManager.register(
      { scope: 'container', containerId, repositoryId },
      new RepositoryClass(repositoryFactoryContext),
    );
  }
};
