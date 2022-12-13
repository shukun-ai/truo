import { FlowEvents } from '@shukun/schema';

import { mockEmptyDependencies } from '../util/unit-testing/unit-testing.helper';

import { CompileFactoryService } from './compile-factory.service';

import { CompileService } from './compile.service';
import { NestedEventService } from './nested-event.service';

describe('CompileService', () => {
  let compileService: CompileService;
  let compileFactoryService: CompileFactoryService;
  let nestedEventService: NestedEventService;

  beforeEach(() => {
    compileFactoryService = new CompileFactoryService(
      mockEmptyDependencies(),
      mockEmptyDependencies(),
    );
    nestedEventService = new NestedEventService();

    compileService = new CompileService(
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
                  output: {
                    id: '$.index',
                  },
                },
              },
              description: '',
            },
            repeatSecond: {
              type: 'Success',
              output: {
                id: '$.index',
              },
            },
          },
          description: 'hi',
        },
        first: {
          type: 'Success',
          output: {
            id: '$.input',
          },
        },
      };

      const parentEventNames = undefined;
      const output = await compileService.compileEvents(
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
  });
});
