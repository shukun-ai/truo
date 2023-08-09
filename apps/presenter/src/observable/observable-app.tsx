import { AppProps } from '@shukun/presenter/widget-react';
import { useObservableState } from 'observable-hooks';
import { useEffect } from 'react';
import { Observable } from 'rxjs';

import { App } from '../ui/app';

import { registerContainers } from './register';
import { ThemeProvider } from './theme-provider';

export const createObservableApp = (observable: Observable<AppProps>) => () => {
  const appProps = useObservableState(observable);

  useEffect(() => {
    if (appProps) {
      registerContainers(appProps.presenter, {
        store: appProps.store,
        apiRequester: appProps.api,
        repositoryManager: appProps.repositoryManager,
        reactWidgets: appProps.reactWidgets,
        reactRepositories: appProps.reactRepositories,
        auth: appProps.auth,
        router: appProps.router,
      });
    }
  }, [appProps]);

  if (!appProps) {
    return <div>loading...</div>;
  }

  return (
    <ThemeProvider>
      <App {...appProps} />
    </ThemeProvider>
  );
};
