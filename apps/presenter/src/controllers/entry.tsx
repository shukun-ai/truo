import React, { StrictMode } from 'react';

import { Injector } from '../injector';

import { AssembledApp } from './app-assemble';
import { InjectorProvider } from './contexts/injector-context';
import { PlayerDefinitionProvider } from './contexts/player-definition.context';
import { RouterProvider } from './contexts/router.context';

const ROUTER_REPOSITORY_KEY = 'router';
const CURRENT_USER_REPOSITORY_KEY = 'currentUser';

export const createApp = (injector: Injector) => {
  injector.repositoryManager.add(
    ROUTER_REPOSITORY_KEY,
    injector.routerRepository,
  );
  injector.repositoryManager.add(
    CURRENT_USER_REPOSITORY_KEY,
    injector.currentUserRepository,
  );

  const App = () => {
    return (
      <StrictMode>
        <InjectorProvider injector={injector}>
          <RouterProvider injector={injector}>
            <PlayerDefinitionProvider injector={injector}>
              <AssembledApp injector={injector} />
            </PlayerDefinitionProvider>
          </RouterProvider>
        </InjectorProvider>
      </StrictMode>
    );
  };

  return App;
};
