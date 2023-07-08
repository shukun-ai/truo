import { AppProps } from '@shukun/presenter/widget-react';
import { useObservableState } from 'observable-hooks';
import { Observable } from 'rxjs';

import { App } from '../ui/app';

import { ThemeProvider } from './theme-provider';

export const createObservableApp = (observable: Observable<AppProps>) => () => {
  const appProps = useObservableState(observable);

  if (!appProps) {
    return <div>loading...</div>;
  }

  return (
    <ThemeProvider>
      <App {...appProps} />
    </ThemeProvider>
  );
};
