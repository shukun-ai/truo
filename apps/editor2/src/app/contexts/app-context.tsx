import { createContext, useContext } from 'react';

import { ApiRequester } from '../../apis/requester';
import { AuthRepository } from '../../repositories/auth/auth-repository';
import { IAuthRepository } from '../../repositories/auth/auth-repository.interface';
import { authStore } from '../../repositories/auth/auth-store';
import { ConnectorRepository } from '../../repositories/connector/connector-repository';
import { IConnectorRepository } from '../../repositories/connector/connector-repository.interface';
import { EnvironmentRepository } from '../../repositories/environment/environment-repository';
import { IEnvironmentRepository } from '../../repositories/environment/environment-repository.interface';
import { GlobalRepository } from '../../repositories/global/global-repository';
import { IGlobalRepository } from '../../repositories/global/global-repository.interface';
import { MetadataRepository } from '../../repositories/metadata/metadata-repository';
import { IMetadataRepository } from '../../repositories/metadata/metadata-repository.interface';
import { PresenterRepository } from '../../repositories/presenter/presenter-repository';
import { IPresenterRepository } from '../../repositories/presenter/presenter-repository.interface';
import { TabRepository } from '../../repositories/tab/tab-repository';
import { ITabRepository } from '../../repositories/tab/tab-repository.interface';
import { TaskRepository } from '../../repositories/task/task-repository';
import { ITaskRepository } from '../../repositories/task/task-repository.interface';

export type AppContextProps = {
  repositories: {
    authRepository: IAuthRepository;
    globalRepository: IGlobalRepository;
    presenterRepository: IPresenterRepository;
    connectorRepository: IConnectorRepository;
    tabRepository: ITabRepository;
    taskRepository: ITaskRepository;
    metadataRepository: IMetadataRepository;
    environmentRepository: IEnvironmentRepository;
  };
};

export const initializeAppContextProps = (): AppContextProps => {
  const apiRequester = new ApiRequester(authStore);
  const authRepository = new AuthRepository(apiRequester);
  const globalRepository = new GlobalRepository(apiRequester);
  const presenterRepository = new PresenterRepository(apiRequester);
  const connectorRepository = new ConnectorRepository(apiRequester);
  const tabRepository = new TabRepository();
  const taskRepository = new TaskRepository(apiRequester);
  const metadataRepository = new MetadataRepository(apiRequester);
  const environmentRepository = new EnvironmentRepository(apiRequester);

  return {
    repositories: {
      authRepository,
      globalRepository,
      presenterRepository,
      connectorRepository,
      tabRepository,
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
