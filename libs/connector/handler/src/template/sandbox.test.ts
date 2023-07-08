import { HandlerContext } from '../internal/types';

import { runSandbox } from './sandbox';

describe('sandbox', () => {
  describe('runSandbox', () => {
    it('run sandbox.', () => {
      const code = `return $.index + 1;`;
      const context: HandlerContext = {
        input: null,
        next: undefined,
        index: 0,
        env: {},
        store: {},
        orgName: 'shukun',
        operatorId: undefined,
        taskDefinitions: {},
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        connector: undefined as any,
      };
      const output = runSandbox(code, context);
      expect(output).toEqual(1);
    });
  });
});
