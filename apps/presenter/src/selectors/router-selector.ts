import { IStore, RouterRepositoryStates } from '@shukun/presenter/definition';

import { scopes } from './app-scopes';

export const selectRouter = (store: IStore): RouterRepositoryStates => {
  return store.getValue(scopes.router, []);
};
