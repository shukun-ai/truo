import { createContext, useContext } from 'react';

import { IRepositoryManager } from '../../repository/repository-manager.interface';

export type repositoryManagerProviderProps = {
  repositoryManager: IRepositoryManager;
  children: JSX.Element;
};

export const RepositoryManagerProvider = ({
  repositoryManager,
  children,
}: repositoryManagerProviderProps) => {
  return (
    <RepositoryManager.Provider value={repositoryManager}>
      {children}
    </RepositoryManager.Provider>
  );
};

export const useRepositoryManager = () => {
  const repositoryManager = useContext(RepositoryManager);
  return repositoryManager;
};

const RepositoryManager = createContext<IRepositoryManager | null>(null);
