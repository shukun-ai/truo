import { PresenterRepository } from '@shukun/schema';
import { IApiRequester, IStore } from '@shukun/widget';

export type RepositoryFactoryContext = {
  containerId: string;
  repositoryId: string;
  definition: PresenterRepository;
  store: IStore;
  apiRequester: IApiRequester;
};
