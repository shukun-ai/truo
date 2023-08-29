import { AppProps } from '../interfaces/app';

import { AssembledWidgets } from './assembled-widgets';

export const App = (appProps: AppProps) => {
  const root = appProps.presenter.nodes['root'] ?? [];
  return <AssembledWidgets nodes={root} appProps={appProps} />;
};
