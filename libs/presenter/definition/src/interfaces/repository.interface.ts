import { PresenterRepository } from '@shukun/schema';

import { IApiRequester } from '../interfaces/requester.interface';

import { IStore } from '../interfaces/store.interface';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IRepository {}

export type RepositoryContext = {
  type: 'app' | 'container';
  containerId: string | null;
  repositoryId: string;
  definition: PresenterRepository;
  store: IStore;
  apiRequester: IApiRequester;
};
