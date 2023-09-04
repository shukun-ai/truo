import { createContext, useContext } from 'react';

import { ApiRequester } from '../../apis/requester';
import { IApiRequester } from '../../apis/requester.interface';
import { environment } from '../../environments/environment';
import { Environment } from '../../environments/environment.type';
import { AuthRepository } from '../../repositories/auth/auth-repository';
import { IAuthRepository } from '../../repositories/auth/auth-repository.interface';
import { authStore } from '../../repositories/auth/auth-store';
import { ConnectorRepository } from '../../repositories/connector/connector-repository';
import { IConnectorRepository } from '../../repositories/connector/connector-repository.interface';
import { EnvironmentRepository } from '../../repositories/environment/environment-repository';
import { IEnvironmentRepository } from '../../repositories/environment/environment-repository.interface';
import { GlobalRepository } from '../../repositories/global/global-repository';
import { IGlobalRepository } from '../../repositories/global/global-repository.interface';
import { metadataRepository } from '../../repositories/metadata/metadata-repository';
import { PresenterRepository } from '../../repositories/presenter/presenter-repository';
import { IPresenterRepository } from '../../repositories/presenter/presenter-repository.interface';
import { TaskRepository } from '../../repositories/task/task-repository';
import { ITaskRepository } from '../../repositories/task/task-repository.interface';
import { RouterMap, routerMap } from '../router-map';

export type AppContextProps = {
  apiRequester: IApiRequester;
  routerMap: RouterMap;
  environment: Environment;
  repositories: {
    authRepository: IAuthRepository;
    globalRepository: IGlobalRepository;
    presenterRepository: IPresenterRepository;
    connectorRepository: IConnectorRepository;
    taskRepository: ITaskRepository;
    metadataRepository: typeof metadataRepository;
    environmentRepository: IEnvironmentRepository;
  };
};

export const initializeAppContextProps = (): AppContextProps => {
  const apiRequester = new ApiRequester(authStore);
  const authRepository = new AuthRepository(apiRequester);
  const globalRepository = new GlobalRepository(apiRequester);
  const presenterRepository = new PresenterRepository(apiRequester);
  const connectorRepository = new ConnectorRepository(apiRequester);
  const taskRepository = new TaskRepository(apiRequester);
  const environmentRepository = new EnvironmentRepository(apiRequester);

  return {
    apiRequester,
    routerMap: routerMap,
    environment: environment,
    repositories: {
      authRepository,
      globalRepository,
      presenterRepository,
      connectorRepository,
      taskRepository,
      metadataRepository,
      environmentRepository,
    },
  };
};

const AppContext = createContext<AppContextProps | null>(null);

export const AppProvider = ({ children }: { children: JSX.Element }) => (
  <AppContext.Provider value={initializeAppContextProps()}>
    {children}
  </AppContext.Provider>
);

export const useAppContext = (): AppContextProps => {
  const appContext = useContext(AppContext);
  if (!appContext) {
    throw new Error('The appContext is not initialize.');
  }
  return appContext;
};
