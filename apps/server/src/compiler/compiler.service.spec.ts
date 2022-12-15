import { FlowEvents } from '@shukun/schema';

import { CompileFactoryService } from './compile-factory.service';

import { CompilerService } from './compiler.service';
import { NestedEventService } from './nested-event.service';

describe('CompilerService', () => {
  let compilerService: CompilerService;
  let compileFactoryService: CompileFactoryService;
  let nestedEventService: NestedEventService;

  beforeEach(() => {
    compileFactoryService = new CompileFactoryService();
    nestedEventService = new NestedEventService();

    compilerService = new CompilerService(
      compileFactoryService,
      nestedEventService,
    );
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
          events: {
            repeatFirst: {
              type: 'Repeat',
              next: 'repeatSecond',
              repeatCount: '$.input.id',
              startEventName: 'repeatTwoFirst',
              events: {
                repeatTwoFirst: {
                  type: 'Success',
                  output: "{ id: '$.index' }",
                },
              },
              description: '',
            },
            repeatSecond: {
              type: 'Success',
              output: "{ id: '$.index' }",
            },
          },
          description: 'hi',
        },
        first: {
          type: 'Success',
          output: "{ id: '$.input' }",
        },
      };

      const parentEventNames = undefined;
      const output = await compilerService.compileEvents(
        events,
        parentEventNames,
      );

      expect(output).toEqual({
        repeat: 'test',
        'repeat->repeatFirst': 'test',
        'repeat->repeatFirst->repeatTwoFirst': 'test',
        'repeat->repeatSecond': 'test',
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
              events: {
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
                      events: {
                        p2p1: {
                          type: 'Store',
                          next: '',
                          key: 'hi',
                          value: 'hi',
                        },
                      },
                    },
                  ],
                },
              },
            },
          ],
        },
      };

      const parentEventNames = undefined;
      const output = await compilerService.compileEvents(
        events,
        parentEventNames,
      );

      expect(output).toEqual({
        parallel: 'test',
        'parallel->0->p1': 'test',
        'parallel->0->p2': 'test',
        'parallel->0->p2->0->p2p1': 'test',
      });
    });
  });
});
