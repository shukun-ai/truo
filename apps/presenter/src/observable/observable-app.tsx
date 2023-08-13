import { Injector, RouterState } from '@shukun/presenter/definition';

import { useObservableState } from 'observable-hooks';
import { useEffect, useState } from 'react';

import { AppProps } from '../interfaces/app';

export type ObservableAppProps = {
  injector: Injector;
  render: (app: AppProps) => JSX.Element;
};

export const ObservableApp = ({ injector, render }: ObservableAppProps) => {
  const [presenter, setPresenter] = useState<AppProps['presenter']>();
  const [widgets, setWidgets] = useState<AppProps['widgets']>();
  const [repositories, setRepositories] = useState<AppProps['repositories']>();

  useEffect(() => {
    const router = injector.store.getValue(['router']) as RouterState;

    injector.loader.loadPresenter(router).then((presenter) => {
      setPresenter(presenter);
    });
    injector.loader.loadWidgets(router).then((widgets) => {
      setWidgets(widgets);
    });
    injector.loader.loadRepositories(router).then((repositories) => {
      setRepositories(repositories);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const state = useObservableState(injector.store.queryAll()) as
    | AppProps['state']
    | undefined;

  if (!presenter || !widgets || !repositories || !state) {
    return <div>loading...</div>;
  }

  const app: AppProps = {
    injector,
    presenter,
    widgets,
    repositories,
    state,
  };
  return render(app);
};
