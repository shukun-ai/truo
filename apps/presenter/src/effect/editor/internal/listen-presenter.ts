import {
  Injector,
  POST_MESSAGE_EDITOR_PREVIEW,
  RouterMode,
} from '@shukun/presenter/definition';
import { PresenterSchema } from '@shukun/schema';

export const createListenPresenter = (
  environments: Injector['environments'],
  store: Injector['store'],
): Injector['editor']['listenPresenter'] => {
  return (callback: (payload: { presenter: PresenterSchema }) => void) => {
    const listener = createListener(environments, store, callback);
    window.addEventListener('message', listener);

    return {
      unregister: () => {
        window.removeEventListener('message', listener);
      },
    };
  };
};

const createListener =
  (
    environments: Injector['environments'],
    store: Injector['store'],
    callback: (payload: { presenter: PresenterSchema }) => void,
  ) =>
  (event: MessageEvent<any>) => {
    const state: any = store.getAllValue();
    if (state?.router?.mode !== RouterMode.Editor) {
      console.warn('Only support Editor RouterMode: ' + state?.router?.mode);
      return;
    }
    if (
      !environments.postMessageCrossOrigin &&
      event.origin !== window.origin
    ) {
      console.warn(
        'Only support same origin between parent and child PostMessage: ' +
          event.origin,
      );
      return;
    }
    const value = parseEvent(event.data);
    if (value.presenter) {
      callback({ presenter: value.presenter });
    }
  };

const parseEvent = (data: unknown): { presenter?: PresenterSchema } => {
  if (
    typeof data === 'object' &&
    data &&
    'shukunType' in data &&
    data.shukunType === POST_MESSAGE_EDITOR_PREVIEW &&
    'payload' in data &&
    typeof data.payload === 'object'
  ) {
    return data.payload as any;
  } else {
    return {};
  }
};
