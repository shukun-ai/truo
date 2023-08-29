import { Injector } from '@shukun/presenter/definition';

import { parseParameters } from './internal/template';

export const initializeTemplate = (): Injector['template'] => {
  return {
    run: (template: unknown, state: unknown) =>
      parseParameters(template, {
        state,
        helpers: {},
      }),
  };
};
