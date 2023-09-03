import {
  Injector,
  POST_MESSAGE_EDITOR_STATE,
  RouterMode,
} from '@shukun/presenter/definition';

export const createListenState = (
  environments: Injector['environments'],
  store: Injector['store'],
): Injector['editor']['listenState'] => {
  return () => {
    const state: any = store.getAllValue();
    if (state?.router?.mode !== RouterMode.Editor) {
      console.warn('Only support Editor RouterMode: ' + state?.router?.mode);
      return;
    }
    if (!window.parent) {
      console.warn('Only support iframe');
      return;
    }

    const subscription = store.queryAll().subscribe((state) => {
      window.parent.postMessage(
        {
          shukunType: POST_MESSAGE_EDITOR_STATE,
          payload: { state },
        },
        '*',
      );
    });

    return {
      unregister: () => {
        subscription.unsubscribe();
      },
    };
  };
};
