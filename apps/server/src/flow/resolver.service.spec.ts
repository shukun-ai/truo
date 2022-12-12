import { FlowEvents } from '@shukun/schema';

import { ResolverContext } from './interface';
import { NestedEventService } from './nested-event.service';
import { ResolverService } from './resolver.service';
import { VMService } from './vm.service';

describe('ResolverService', () => {
  let resolverService: ResolverService;
  let nestedEventService: NestedEventService;
  let vmService: VMService;

  beforeEach(() => {
    nestedEventService = new NestedEventService();
    vmService = new VMService();

    resolverService = new ResolverService(nestedEventService, vmService);
  });

  describe('ExecuteEvents', () => {
    it('should return 3', async () => {
      jest.spyOn(vmService, 'executeVM').mockImplementation(async () => 3);

      const startEventName = 'test';
      const events: FlowEvents = {
        test: {
          type: 'Success',
          output: {
            data: 'test',
          },
        },
      };
      const input = { test: 3 };
      const context: ResolverContext = {
        index: 0,
        store: {},
        environment: {},
        compiledCodes: {
          test: 'test',
        },
        eventName: startEventName,
        parentEventNames: '',
      };

      const results = await resolverService.executeEvent(
        events,
        input,
        context,
      );
      expect(results.output).toEqual(3);
      expect(results.previousContext.eventName).toEqual('test');
    });

    it('should return 3', async () => {
      jest.spyOn(vmService, 'executeVM').mockImplementation(async () => 3);

      const startEventName = 'test';
      const events: FlowEvents = {
        test: {
          type: 'Repeat',
          next: 'second',
          repeatCount: '3',
          description: 'description',
          startEventName: 're1',
          events: {
            re1: {
              type: 'Success',
              output: {
                data: '3',
              },
            },
          },
        },
        second: {
          type: 'Success',
          output: {
            data: 3,
          },
        },
      };
      const input = { test: 3 };
      const context: ResolverContext = {
        index: 0,
        store: {},
        environment: {},
        compiledCodes: {
          test: 'test',
          'test->re1': 'test2',
          second: 'test',
        },
        eventName: startEventName,
        parentEventNames: '',
      };

      const results = await resolverService.executeEvent(
        events,
        input,
        context,
      );
      expect(results.output).toEqual(3);
      expect(results.previousContext.eventName).toEqual('second');
    });
  });
});
