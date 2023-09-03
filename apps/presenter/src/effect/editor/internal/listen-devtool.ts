import {
  Injector,
  POST_MESSAGE_EDITOR_DEVTOOL,
  RouterMode,
} from '@shukun/presenter/definition';

export const createListenDevtool = (
  environments: Injector['environments'],
  devtool: Injector['devtool'],
  store: Injector['store'],
): Injector['editor']['listenDevtool'] => {
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

    const subscription = devtool.query().subscribe((logs) => {
      window.parent.postMessage(
        {
          shukunType: POST_MESSAGE_EDITOR_DEVTOOL,
          payload: logs,
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
