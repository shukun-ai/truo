import React, { ReactElement } from 'react';

import { RepositoriesContext } from './app-context';

export type AppContextProviderProps = {
  children: JSX.Element;
};

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  return (
    <RepositoriesContext.Provider value={{}}>
      {children}
    </RepositoriesContext.Provider>
  );
};
