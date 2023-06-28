import { PresenterRepository } from '@shukun/schema';

import { IApiRequester } from './requester.interface';
import { IStore } from './store.interface';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IRepository {}

export type AppRepositoryContext = {
  type: 'app';
  repositoryId: 'router' | 'auth';
  store: IStore;
};

// TODO rename to ContainerRepositoryContext
export type RepositoryFactoryContext = {
  type: 'container';
  containerId: string | null;
  repositoryId: string;
  definition: PresenterRepository;
  store: IStore;
  apiRequester: IApiRequester;
};

export type ContainerFactoryContext = RepositoryFactoryContext;
