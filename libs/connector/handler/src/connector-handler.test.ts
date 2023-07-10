import { execute } from './connector-handler';
import { HandlerContext } from './types';

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
    };

    it('should handle repeat', async () => {
      const output = await execute({
        ...defaultContext,
        input: {
          repeat: 2,
        },
      });
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
    };

    it('should handle parallel', async () => {
      const output = await execute({
        ...defaultContext,
      });
      expect(output.input).toEqual({
        say: ['Hello', 'World!'],
      });
    });
  });

  describe('choice', () => {
    const defaultContext: HandlerContext = {
      input: null,
      next: 'choice',
      index: 0,
      env: {},
      temps: {},
      params: {},
      orgName: 'shukun',
      operatorId: undefined,
      accessToken: undefined,
      taskDefinitions: {},
      connector: {
        label: 'test',
        start: 'choice',
        tasks: {
          choice: {
            type: 'choice',
            next: 'handleDefaultLanguage',
            parameters: {
              conditions: [
                {
                  condition: "$$_js:return $.input.language === 'EN'",
                  next: 'handleEnglish',
                },
                {
                  condition: "$$_js:return $.input.language === 'CN'",
                  next: 'handleChinese',
                },
              ],
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
    };

    it('should return English, when set EN choice', async () => {
      const output = await execute({
        ...defaultContext,
        input: {
          language: 'EN',
        },
      });
      expect(output.input).toEqual({
        language: 'English',
      });
    });

    it('should return Chinese, when set CN choice', async () => {
      const output = await execute({
        ...defaultContext,
        input: {
          language: 'CN',
        },
      });
      expect(output.input).toEqual({
        language: 'Chinese',
      });
    });

    it('should return Default, when set FR choice', async () => {
      const output = await execute({
        ...defaultContext,
        input: {
          language: 'FR',
        },
      });
      expect(output.input).toEqual({
        language: 'Default',
      });
    });
  });
});
