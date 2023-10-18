import { HandlerContext } from '@shukun/connector/handler';

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
        temps: {},
        params: {},
        orgName: 'shukun',
        operatorId: undefined,
        accessToken: undefined,
      };
      const output = runSandbox(code, context);
      expect(output).toEqual(1);
    });
  });
});
