import { PresenterRepository } from '@shukun/schema';

import { IApiRequester } from './requester.interface';
import { IStore } from './store.interface';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IRepository {}

export type RepositoryFactoryContext = {
  containerId: string;
  repositoryId: string;
  definition: PresenterRepository;
  store: IStore;
  apiRequester: IApiRequester;
};
