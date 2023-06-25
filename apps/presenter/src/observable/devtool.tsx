import { Observable, Subject } from 'rxjs';

type Action = {
  action: string;
  state: Record<string, any>;
};

type ActionsDispatcher = Observable<Action>;

interface DevtoolsOptions {
  maxAge?: number;
  name?: string;
  postTimelineUpdate?: () => void;
  preAction?: () => void;
  actionsDispatcher?: ActionsDispatcher;
  logTrace?: boolean;
}

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: {
      connect(options: DevtoolsOptions): {
        send(action: string, state: Record<string, any>): void;
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

const externalEvents$ = new Subject<Action>();

export const send = (action: Action) => {
  externalEvents$.next(action);
};

export const devTools = (options: DevtoolsOptions = {}) => {
  if (!window.__REDUX_DEVTOOLS_EXTENSION__) return;
  const instance = window.__REDUX_DEVTOOLS_EXTENSION__.connect(options);
  instance.init({ value: 'initial state' });

  externalEvents$.subscribe(({ action, state }) => {
    instance.send(action, state);
  });
};
