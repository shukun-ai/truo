import { WidgetSchema } from '@shukun/schema';
import { createContext, useContext } from 'react';

import { ApiRequester } from '../../apis/requester';
import { AuthRepository } from '../../repositories/auth-repository';
import { authStore } from '../../repositories/auth-store';
import { GlobalRepository } from '../../repositories/global-repository';
import { PresenterRepository } from '../../repositories/presenter-repository';
import { widgetDefinitions as baseWidgetDefinitions } from '../../widgets/widget-loader';

export type AppContextProps = {
  repositories: {
    authRepository: AuthRepository;
    globalRepository: GlobalRepository;
    presenterRepository: PresenterRepository;
  };
  widgetDefinitions: Record<string, WidgetSchema>;
};

export const initializeAppContextProps = (): AppContextProps => {
  const apiRequester = new ApiRequester(authStore);
  const authRepository = new AuthRepository(apiRequester);
  const globalRepository = new GlobalRepository(apiRequester);
  const presenterRepository = new PresenterRepository(apiRequester);
  const widgetDefinitions = baseWidgetDefinitions;

  return {
    repositories: {
      authRepository,
      globalRepository,
      presenterRepository,
    },
    widgetDefinitions,
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
