import { CssVarsProvider, CssBaseline } from '@mui/joy';
import { AppProps } from '@shukun/widget-react';
import { useObservableState } from 'observable-hooks';
import { Observable } from 'rxjs';

import { App } from '../ui/app';

import { defaultTheme } from './theme';

export const createObservableApp = (observable: Observable<AppProps>) => () => {
  const appProps = useObservableState(observable);

  if (!appProps) {
    return <div>loading...</div>;
  }

  return (
    <CssVarsProvider theme={defaultTheme}>
      <CssBaseline />
      <App {...appProps} />
    </CssVarsProvider>
  );
};
