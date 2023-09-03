import { Injector } from '@shukun/presenter/definition';

import { createListenDevtool } from './internal/listen-devtool';
import { createListenPresenter } from './internal/listen-presenter';

export const initializeEditor = (
  environments: Injector['environments'],
  devtool: Injector['devtool'],
  store: Injector['store'],
): Injector['editor'] => {
  return {
    listenPresenter: createListenPresenter(environments, store),
    listenDevtool: createListenDevtool(environments, devtool, store),
  };
};
