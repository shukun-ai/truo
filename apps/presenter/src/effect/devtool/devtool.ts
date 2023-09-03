import { Injector } from '@shukun/presenter/definition';

import { logState, logWidget, query } from './internal/devtool-store';
import { createReduxDevtool } from './internal/redux-devtool';

export const initializeDevtool = (
  environments: Injector['environments'],
): Injector['devtool'] => {
  const reduxDevtool = createReduxDevtool(environments);

  query().subscribe((logs) => {
    const { lastDescription, ...other } = logs;
    reduxDevtool.send(lastDescription, other);
  });

  return {
    logState,
    logWidget,
    query,
  };
};
