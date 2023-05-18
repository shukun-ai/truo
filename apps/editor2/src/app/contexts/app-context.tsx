import { createContext, useContext } from 'react';

import { ApiRequester } from '../../apis/requester';
import { AuthRepository } from '../../repositories/auth-repository';
import { authStore } from '../../repositories/auth-store';
import { DashboardRepository } from '../../repositories/dashboard-repository';

export type AppContextProps = {
  repositories: {
    authRepository: AuthRepository;
    dashboardRepository: DashboardRepository;
  };
};

export const initializeAppContextProps = (): AppContextProps => {
  const apiRequester = new ApiRequester(authStore);
  const authRepository = new AuthRepository(authStore, apiRequester);
  const dashboardRepository = new DashboardRepository(apiRequester);

  return {
    repositories: {
      authRepository,
      dashboardRepository,
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
