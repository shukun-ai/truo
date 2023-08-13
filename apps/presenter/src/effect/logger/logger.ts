import { Injector } from '@shukun/presenter/definition';

export const initializeLogger = (
  environments: Injector['environments'],
  devtool: Injector['devtool'],
): Injector['logger'] => {
  return {
    info: (message, payload) => {
      if (environments.production) {
        return;
      }
      // eslint-disable-next-line no-console
      console.log(message, payload);
    },
    error: (message, payload) => {
      console.error(message, payload);
    },
  };
};
