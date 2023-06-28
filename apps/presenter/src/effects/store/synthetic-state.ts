import { get } from './store-utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getSyntheticState = (state: any, containerId: string) => {
  const containerState = get(state, ['container', containerId]);
  const appState = get(state, ['app']);

  return {
    ...containerState,
    ...appState,
  };
};
