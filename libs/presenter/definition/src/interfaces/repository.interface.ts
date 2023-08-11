import { PresenterRepository } from '@shukun/schema';

import { IAuth } from './auth.interface';
import { IApiRequester } from './requester.interface';
import { IRouter } from './router.interface';
import { IStore } from './store.interface';

export type RepositoryContext = {
  repositoryId: string;
  repository: PresenterRepository;
  store: IStore;
  apiRequester: IApiRequester;
  auth: IAuth;
  router: IRouter;
};
