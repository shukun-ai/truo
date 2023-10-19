import { createContext, useContext } from 'react';

import { ApiRequester } from '../../apis/requester';
import { IApiRequester } from '../../apis/requester.interface';
import { environment } from '../../environments/environment';
import { Environment } from '../../environments/environment.type';
import { AuthRepository } from '../../repositories/auth/auth-repository';
import { IAuthRepository } from '../../repositories/auth/auth-repository.interface';
import { authStore } from '../../repositories/auth/auth-store';
import { connectorRepository } from '../../repositories/connector/connector-repository';
import { environmentRepository } from '../../repositories/environment/environment-repository';
import { GlobalRepository } from '../../repositories/global/global-repository';
import { IGlobalRepository } from '../../repositories/global/global-repository.interface';
import { metadataRepository } from '../../repositories/metadata/metadata-repository';
import { PresenterRepository } from '../../repositories/presenter/presenter-repository';
import { IPresenterRepository } from '../../repositories/presenter/presenter-repository.interface';
import { taskRepository } from '../../repositories/task/task-repository';
import { RouterMap, routerMap } from '../router-map';

export type AppContextProps = {
  apiRequester: IApiRequester;
  routerMap: RouterMap;
  environment: Environment;
  repositories: {
    authRepository: IAuthRepository;
    globalRepository: IGlobalRepository;
    presenterRepository: IPresenterRepository;
    connectorRepository: typeof connectorRepository;
    taskRepository: typeof taskRepository;
    metadataRepository: typeof metadataRepository;
    environmentRepository: typeof environmentRepository;
  };
};

export const initializeAppContextProps = (): AppContextProps => {
  const apiRequester = new ApiRequester(authStore);
  const authRepository = new AuthRepository(apiRequester);
  const globalRepository = new GlobalRepository(apiRequester);
  const presenterRepository = new PresenterRepository(apiRequester);

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
