import { Injector } from '@shukun/presenter/definition';

import { Store } from './internal/store';

export const initializeStore = (
  environments: Injector['environments'],
  devtool: Injector['devtool'],
): Injector['store'] => {
  const store = new Store(environments, devtool);
  return store;
};
