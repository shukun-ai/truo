import { useObservableState } from 'observable-hooks';
import { Observable } from 'rxjs';

import { App } from '../ui/app';
import { AppProps } from '../ui/app.interface';

export const createObservableApp = (observable: Observable<AppProps>) => () => {
  const appProps = useObservableState(observable);

  if (!appProps) {
    return <div>loading...</div>;
  }

  return <App {...appProps} />;
};
