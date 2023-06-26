import { PresenterRepository } from '@shukun/schema';
import { IApiRequester } from '@shukun/widget';

export type RepositoryFactoryContext = {
  definition: PresenterRepository;
  apiRequester: IApiRequester;
};
