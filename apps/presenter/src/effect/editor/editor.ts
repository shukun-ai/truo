import { Injector } from '@shukun/presenter/definition';

import { createListenPresenter } from './internal/listen-presenter';
import { createListenState } from './internal/listen-state';

export const initializeEditor = (
  environments: Injector['environments'],
  devtool: Injector['devtool'],
  store: Injector['store'],
): Injector['editor'] => {
  return {
    listenPresenter: createListenPresenter(environments, store),
    listenState: createListenState(environments, store),
  };
};
