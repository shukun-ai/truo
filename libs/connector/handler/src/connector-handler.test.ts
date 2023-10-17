import { execute } from './connector-handler';
import { taskHandlers } from './handlers-map';
import { runSandbox } from './sandbox/sandbox';
import { parseParameters } from './template/template';
import { HandlerContext, HandlerInjector } from './types';

describe('connector-handler', () => {
  describe('repeat', () => {
    const defaultContext: HandlerContext = {
      input: null,
      next: 'repeat',
      index: 0,
      env: {},
      temps: {},
      params: {},
      orgName: 'shukun',
      operatorId: undefined,
      accessToken: undefined,
    };

    const defaultInjector: HandlerInjector = {
      taskDefinitions: {},
      connector: {
        label: 'test',
        start: 'repeat',
        tasks: {
          repeat: {
            type: 'repeat',
            next: 'show',
            parameters: {
              repeatCount: '$$_js:return $.input.repeat;',
              start: 'repeat1',
            },
          },
          repeat1: {
            type: 'transformer',
            next: 'repeat2',
            parameters: {
              firstWord: 'Hello',
            },
          },
          repeat2: {
            type: 'transformer',
            parameters: {
              fullWord: "$$_js:return $.input.firstWord + ' ' + 'World!'",
            },
          },
          show: {
            type: 'transformer',
            parameters: {
              say: '$$_js:return $.input.map(item => item.fullWord)',
            },
          },
        },
      },
      executeTask: null,
      executeSandbox: null,
      parseParameters,
      taskHandlers,
    };

    it('should handle repeat', async () => {
      const output = await execute(
        {
          ...defaultContext,
          input: {
            repeat: 2,
          },
        },
        {
          ...defaultInjector,
          executeTask: execute,
          executeSandbox: runSandbox,
        },
      );
      expect(output.input).toEqual({
        say: ['Hello World!', 'Hello World!'],
      });
    });
  });

  describe('parallel', () => {
    const defaultContext: HandlerContext = {
      input: null,
      next: 'parallel',
      index: 0,
      env: {},
      temps: {},
      params: {},
      orgName: 'shukun',
      operatorId: undefined,
      accessToken: undefined,
    };

    const defaultInjector: HandlerInjector = {
      taskDefinitions: {},
      connector: {
        label: 'test',
        start: 'parallel',
        tasks: {
          parallel: {
            type: 'parallel',
            next: 'show',
            parameters: {
              branches: [
                {
                  start: 'parallel1',
                },
                {
                  start: 'parallel2',
                },
              ],
            },
          },
          parallel1: {
            type: 'transformer',
            parameters: {
              word: 'Hello',
            },
          },
          parallel2: {
            type: 'transformer',
            parameters: {
              word: 'World!',
            },
          },
          show: {
            type: 'transformer',
            parameters: {
              say: '$$_js:return $.input.map(item => item.word)',
            },
          },
        },
      },
      executeTask: null,
      executeSandbox: null,
      parseParameters,
      taskHandlers,
    };

    it('should handle parallel', async () => {
      const output = await execute(
        {
          ...defaultContext,
        },
        {
          ...defaultInjector,
          executeTask: execute,
          executeSandbox: runSandbox,
        },
      );
      expect(output.input).toEqual({
        say: ['Hello', 'World!'],
      });
    });
  });

  describe('choice', () => {
    const defaultContext: HandlerContext = {
      input: null,
      next: 'isEnglish',
      index: 0,
      env: {},
      temps: {},
      params: {},
      orgName: 'shukun',
      operatorId: undefined,
      accessToken: undefined,
    };

    const defaultInjector: HandlerInjector = {
      taskDefinitions: {},
      connector: {
        label: 'test',
        start: 'isEnglish',
        tasks: {
          isEnglish: {
            type: 'either',
            next: 'handleEnglish',
            parameters: {
              condition: "$$_js:return $.input.language === 'EN'",
              right: 'isChinese',
            },
          },
          isChinese: {
            type: 'either',
            next: 'handleChinese',
            parameters: {
              condition: "$$_js:return $.input.language === 'CN'",
              right: 'handleDefaultLanguage',
            },
          },
          handleEnglish: {
            type: 'transformer',
            parameters: {
              language: 'English',
            },
          },
          handleChinese: {
            type: 'transformer',
            parameters: {
              language: 'Chinese',
            },
          },
          handleDefaultLanguage: {
            type: 'transformer',
            parameters: {
              language: 'Default',
            },
          },
        },
      },
      executeTask: null,
      executeSandbox: null,
      parseParameters,
      taskHandlers,
    };

    it('should return English, when set EN choice', async () => {
      const output = await execute(
        {
          ...defaultContext,
          input: {
            language: 'EN',
          },
        },
        {
          ...defaultInjector,
          executeTask: execute,
          executeSandbox: runSandbox,
        },
      );
      expect(output.input).toEqual({
        language: 'English',
      });
    });

    it('should return Chinese, when set CN choice', async () => {
      const output = await execute(
        {
          ...defaultContext,
          input: {
            language: 'CN',
          },
        },
        {
          ...defaultInjector,
          executeTask: execute,
          executeSandbox: runSandbox,
        },
      );
      expect(output.input).toEqual({
        language: 'Chinese',
      });
    });

    it('should return Default, when set FR choice', async () => {
      const output = await execute(
        {
          ...defaultContext,
          input: {
            language: 'FR',
          },
        },
        {
          ...defaultInjector,
          executeTask: execute,
          executeSandbox: runSandbox,
        },
      );
      expect(output.input).toEqual({
        language: 'Default',
      });
    });
  });
});
