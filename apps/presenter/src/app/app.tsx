import { AppProps } from '../interfaces/app';

import { assembleWidgets } from './assemble-widgets';

export const App = (appProps: AppProps) => {
  const root = appProps.presenter.nodes['root'] ?? [];
  return assembleWidgets({ nodes: root, appProps });
};
