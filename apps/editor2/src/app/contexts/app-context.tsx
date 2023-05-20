import { createContext, useContext } from 'react';

import { ApiRequester } from '../../apis/requester';
import { AuthRepository } from '../../repositories/auth-repository';
import { authStore } from '../../repositories/auth-store';
import { GlobalRepository } from '../../repositories/global-repository';
import { globalStore } from '../../repositories/global-store';
import { PresenterRepository } from '../../repositories/presenter-repository';
import { presenterStore } from '../../repositories/presenter-store';

export type AppContextProps = {
  repositories: {
    authRepository: AuthRepository;
    globalRepository: GlobalRepository;
    presenterRepository: PresenterRepository;
  };
};

export const initializeAppContextProps = (): AppContextProps => {
  const apiRequester = new ApiRequester(authStore);
  const authRepository = new AuthRepository(authStore, apiRequester);
  const globalRepository = new GlobalRepository(globalStore, apiRequester);
  const presenterRepository = new PresenterRepository(
    presenterStore,
    apiRequester,
  );

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
