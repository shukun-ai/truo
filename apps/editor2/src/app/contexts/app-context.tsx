import { createContext, useContext } from 'react';

import { ApiRequester } from '../../apis/requester';
import { AuthRepository } from '../../repositories/auth-repository';
import { authStore } from '../../repositories/auth-store';
import { OrgRepository } from '../../repositories/org-repository';
import { orgStore } from '../../repositories/org-store';

export type AppContextProps = {
  repositories: {
    authRepository: AuthRepository;
    orgRepository: OrgRepository;
  };
};

export const initializeAppContextProps = (): AppContextProps => {
  const apiRequester = new ApiRequester(authStore);
  const authRepository = new AuthRepository(authStore, apiRequester);
  const orgRepository = new OrgRepository(orgStore, apiRequester);

  return {
    repositories: {
      authRepository,
      orgRepository,
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
