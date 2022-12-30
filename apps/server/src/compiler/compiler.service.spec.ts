import { FlowEvents, FlowSchema } from '@shukun/schema';

import { CompileFactoryService } from './compile-factory.service';

import { CompilerService } from './compiler.service';

describe('CompilerService', () => {
  let compilerService: CompilerService;
  let compileFactoryService: CompileFactoryService;

  beforeEach(() => {
    compileFactoryService = new CompileFactoryService();

    compilerService = new CompilerService(compileFactoryService);
  });

  describe('compileEvents', () => {
    it('should return FlowEventCompiledCodes', async () => {
      jest
        .spyOn(compileFactoryService, 'compileEvent')
        .mockImplementation(async () => 'test');

      const events: FlowEvents = {
        repeat: {
          type: 'Repeat',
          next: 'first',
          repeatCount: '$.input.id',
          startEventName: 'repeatFirst',
          description: 'hi',
        },
        repeatFirst: {
          type: 'Repeat',
          next: 'repeatSecond',
          repeatCount: '$.input.id',
          startEventName: 'repeatTwoFirst',
          description: '',
        },
        repeatTwoFirst: {
          type: 'Success',
          output: "{ id: '$.index' }",
        },
        repeatSecond: {
          type: 'Success',
          output: "{ id: '$.index' }",
        },
        first: {
          type: 'Success',
          output: "{ id: '$.input' }",
        },
      };

      const output = await compilerService.compileEvents(events);

      expect(output).toEqual({
        repeat: 'test',
        repeatFirst: 'test',
        repeatTwoFirst: 'test',
        repeatSecond: 'test',
        first: 'test',
      });
    });

    it('should return FlowEventCompiledCodes', async () => {
      jest
        .spyOn(compileFactoryService, 'compileEvent')
        .mockImplementation(async () => 'test');

      const events: FlowEvents = {
        parallel: {
          type: 'Parallel',
          next: '',
          branches: [
            {
              startEventName: 'p1',
            },
          ],
        },
        p1: {
          type: 'Store',
          next: 'p2',
          key: 'hi',
          value: 'hi',
        },
        p2: {
          type: 'Parallel',
          next: '',
          branches: [
            {
              startEventName: 'p2p1',
            },
          ],
        },
        p2p1: {
          type: 'Store',
          next: '',
          key: 'hi',
          value: 'hi',
        },
      };

      const output = await compilerService.compileEvents(events);

      expect(output).toEqual({
        parallel: 'test',
        p1: 'test',
        p2: 'test',
        p2p1: 'test',
      });
    });
  });

  describe('compileFlows', () => {
    it('', async () => {
      jest
        .spyOn(compilerService, 'compileEvents')
        .mockImplementation(async () => ({}));

      const flows: FlowSchema[] = [
        {
          startEventName: 't1',
          name: 'test',
          input: {},
          output: {},
          events: {
            t1: {
              type: 'Success',
              output: '$.input',
            },
          },
        },
      ];

      const output = await compilerService.compileFlows(flows);
      expect(output).toEqual({ test: {} });
    });
  });
});
