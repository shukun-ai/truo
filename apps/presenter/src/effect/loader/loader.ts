import {
  Injector,
  Repository,
  RouterMode,
  RouterState,
} from '@shukun/presenter/definition';
import {
  presenterRepositories,
  presenterWidgets,
} from '@shukun/presenter/widget-react';

import { LocalPresenterLoader } from './internal/local-presenter-loader';
import { ServerPresenterLoader } from './internal/server-presenter-loader';

export const initializeLoader = (
  environments: Injector['environments'],
  devtool: Injector['devtool'],
  store: Injector['store'],
  api: Injector['api'],
): Injector['loader'] => {
  const serverPresenterLoader = new ServerPresenterLoader(api);
  const localPresenterLoader = new LocalPresenterLoader();

  return {
    loadPresenter: (router: RouterState) => {
      if (router.mode === RouterMode.Local) {
        return localPresenterLoader.load(router);
      } else {
        return serverPresenterLoader.load(router);
      }
    },
    loadWidgets,
    loadRepositories,
  };
};

const loadWidgets = async (): Promise<
  Record<string, (props: any) => JSX.Element | JSX.Element[]>
> => {
  return presenterWidgets;
};

const loadRepositories = async (): Promise<Record<string, Repository>> => {
  return presenterRepositories;
};
