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

export type ContainerRepositoryContext = {
  type: 'container';
  containerId: string | null;
  repositoryId: string;
  definition: PresenterRepository;
  store: IStore;
  apiRequester: IApiRequester;
};
