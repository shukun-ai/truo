import { Injector } from '@shukun/presenter/definition';

import { createPresenterSync } from './internal/presenter-sync';

export const initializeEditor = (
  environments: Injector['environments'],
  devtool: Injector['devtool'],
  store: Injector['store'],
): Injector['editor'] => {
  const presenterSync = createPresenterSync(environments, store);

  return {
    register: presenterSync.register,
  };
};
