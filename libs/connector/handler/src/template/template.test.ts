import { runSandbox } from '../sandbox/sandbox';
import { HandlerContext, HandlerInjector } from '../types';

import { parseParameters } from './template';
describe('template', () => {
  describe('parseParameters', () => {
    it('return parsed parameters.', () => {
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
      const injector: HandlerInjector = {
        taskDefinitions: {},
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        connector: undefined as any,
        executeTask: null,
        executeSandbox: runSandbox,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        parseParameters: undefined as any,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        taskHandlers: undefined as any,
      };
      const parameters = {
        key: '$$_js:return $.index + 1;',
        atomName: 'airlines',
        number: 1,
        turnOn: true,
        light: null,
        dark: undefined,
        items: ['$$_js:return $.index + 1;'],
        map: {
          mock: '$$_js:return $.index + 1;',
        },
      };
      const output = parseParameters(parameters, context, injector);
      expect(output).toEqual({
        key: 1,
        atomName: 'airlines',
        number: 1,
        turnOn: true,
        light: null,
        dark: undefined,
        items: [1],
        map: {
          mock: 1,
        },
      });
    });
  });
});
