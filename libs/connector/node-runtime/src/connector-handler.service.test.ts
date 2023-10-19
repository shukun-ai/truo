import { HandlerContext } from '@shukun/connector/handler';

import { ConnectorSchema } from '@shukun/schema';

import { ConnectorHandlerService } from './connector-handler.service';

describe('connector-handler', () => {
  const connectorHandlerService = new ConnectorHandlerService();

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

    const connector: ConnectorSchema = {
      label: 'test',
      start: 'repeat',
      tasks: {
        repeat: {
          label: 'repeat',
          type: 'repeat',
          next: 'show',
          parameters: {
            repeatCount: '$$_js:return $.input.repeat;',
            start: 'repeat1',
          },
        },
        repeat1: {
          label: 'repeat1',
          type: 'transformer',
          next: 'repeat2',
          parameters: {
            firstWord: 'Hello',
          },
        },
        repeat2: {
          label: 'repeat2',
          type: 'transformer',
          parameters: {
            fullWord: "$$_js:return $.input.firstWord + ' ' + 'World!'",
          },
        },
        show: {
          label: 'show',
          type: 'transformer',
          parameters: {
            say: '$$_js:return $.input.map(item => item.fullWord)',
          },
        },
      },
    };

    const taskDefinitions = {};

    it('should handle repeat', async () => {
      const output = await connectorHandlerService.execute(
        {
          ...defaultContext,
          input: {
            repeat: 2,
          },
        },
        connector,
        taskDefinitions,
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

    const connector: ConnectorSchema = {
      label: 'test',
      start: 'parallel',
      tasks: {
        parallel: {
          label: 'parallel',
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
          label: 'parallel1',
          type: 'transformer',
          parameters: {
            word: 'Hello',
          },
        },
        parallel2: {
          label: 'parallel2',
          type: 'transformer',
          parameters: {
            word: 'World!',
          },
        },
        show: {
          label: 'show',
          type: 'transformer',
          parameters: {
            say: '$$_js:return $.input.map(item => item.word)',
          },
        },
      },
    };

    const taskDefinitions = {};

    it('should handle parallel', async () => {
      const output = await connectorHandlerService.execute(
        {
          ...defaultContext,
        },
        connector,
        taskDefinitions,
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

    const connector: ConnectorSchema = {
      label: 'test',
      start: 'isEnglish',
      tasks: {
        isEnglish: {
          label: 'isEnglish',
          type: 'either',
          next: 'handleEnglish',
          parameters: {
            condition: "$$_js:return $.input.language === 'EN'",
            right: 'isChinese',
          },
        },
        isChinese: {
          label: 'isChinese',
          type: 'either',
          next: 'handleChinese',
          parameters: {
            condition: "$$_js:return $.input.language === 'CN'",
            right: 'handleDefaultLanguage',
          },
        },
        handleEnglish: {
          label: 'handleEnglish',
          type: 'transformer',
          parameters: {
            language: 'English',
          },
        },
        handleChinese: {
          label: 'handleChinese',
          type: 'transformer',
          parameters: {
            language: 'Chinese',
          },
        },
        handleDefaultLanguage: {
          label: 'handleDefaultLanguage',
          type: 'transformer',
          parameters: {
            language: 'Default',
          },
        },
      },
    };

    const taskDefinitions = {};

    it('should return English, when set EN choice', async () => {
      const output = await connectorHandlerService.execute(
        {
          ...defaultContext,
          input: {
            language: 'EN',
          },
        },
        connector,
        taskDefinitions,
      );
      expect(output.input).toEqual({
        language: 'English',
      });
    });

    it('should return Chinese, when set CN choice', async () => {
      const output = await connectorHandlerService.execute(
        {
          ...defaultContext,
          input: {
            language: 'CN',
          },
        },
        connector,
        taskDefinitions,
      );
      expect(output.input).toEqual({
        language: 'Chinese',
      });
    });

    it('should return Default, when set FR choice', async () => {
      const output = await connectorHandlerService.execute(
        {
          ...defaultContext,
          input: {
            language: 'FR',
          },
        },
        connector,
        taskDefinitions,
      );
      expect(output.input).toEqual({
        language: 'Default',
      });
    });
  });
});
