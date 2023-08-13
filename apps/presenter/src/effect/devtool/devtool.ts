import { Injector } from '../../interfaces/injector';

export const initializeDevtool = (
  environments: Injector['environments'],
): Injector['devtool'] => {
  if (environments.production) {
    return createProductionDevtool();
  }
  if (!window.__REDUX_DEVTOOLS_EXTENSION__) {
    return createProductionDevtool();
  }

  const instance = window.__REDUX_DEVTOOLS_EXTENSION__.connect({});
  instance.init({ value: 'initial state' });

  return {
    send: (action, scope, state) => {
      instance.send(action, state);
    },
  };
};

const createProductionDevtool = (): Injector['devtool'] => {
  return {
    send: () => {
      //
    },
  };
};

interface DevtoolsOptions {
  maxAge?: number;
  name?: string;
  postTimelineUpdate?: () => void;
  preAction?: () => void;
  logTrace?: boolean;
}

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: {
      connect(options: DevtoolsOptions): {
        send(action: string, state: unknown): void;
        init(state: Record<string, any>): void;
        unsubscribe(): void;
        subscribe(
          cb: (message: {
            type: string;
            payload: { type: string };
            state: string;
          }) => void,
        ): () => void;
      };
    };
  }
}
