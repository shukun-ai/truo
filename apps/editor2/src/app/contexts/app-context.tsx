import { createContext, useContext } from 'react';

import { ApiRequester } from '../../apis/requester';
import { AuthRepository } from '../../repositories/auth/auth-repository';
import { IAuthRepository } from '../../repositories/auth/auth-repository.interface';
import { authStore } from '../../repositories/auth/auth-store';
import { GlobalRepository } from '../../repositories/global/global-repository';
import { IGlobalRepository } from '../../repositories/global/global-repository.interface';
import { PresenterRepository } from '../../repositories/presenter/presenter-repository';
import { IPresenterRepository } from '../../repositories/presenter/presenter-repository.interface';

export type AppContextProps = {
  repositories: {
    authRepository: IAuthRepository;
    globalRepository: IGlobalRepository;
    presenterRepository: IPresenterRepository;
  };
};

export const initializeAppContextProps = (): AppContextProps => {
  const apiRequester = new ApiRequester(authStore);
  const authRepository = new AuthRepository(apiRequester);
  const globalRepository = new GlobalRepository(apiRequester);
  const presenterRepository = new PresenterRepository(apiRequester);

  return {
    repositories: {
      authRepository,
      globalRepository,
      presenterRepository,
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
