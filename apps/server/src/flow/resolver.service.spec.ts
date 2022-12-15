import { FlowEvents } from '@shukun/schema';

import { NestedEventService } from '../compiler/nested-event.service';

import { SandboxService } from '../sandbox/sandbox.service';
import { mockEmptyDependencies } from '../util/unit-testing/unit-testing.helper';

import { ResolverContext } from './flow.interface';

import { ResolverService } from './resolver.service';

describe('ResolverService', () => {
  let resolverService: ResolverService;
  let nestedEventService: NestedEventService;
  let sandboxService: SandboxService;

  beforeEach(() => {
    nestedEventService = new NestedEventService();
    sandboxService = new SandboxService(mockEmptyDependencies());

    resolverService = new ResolverService(nestedEventService, sandboxService);
  });

  describe('ExecuteEvents', () => {
    it('Test Common Event', async () => {
      const input = { test: 3 };
      const startEventName = 'test';
      const events: FlowEvents = {
        test: {
          type: 'Success',
          output: "{ data: 'test' }",
        },
      };
      const compiledCodes = {
        test: 'test',
      };
      const context: ResolverContext = {
        parameter: input,
        input,
        output: null,
        next: null,
        index: 0,
        store: {},
        env: {},
        eventName: startEventName,
        parentEventNames: '',
        orgName: 'test',
        operatorId: undefined,
      };

      jest
        .spyOn(sandboxService, 'executeVM')
        .mockImplementation(async () => context);

      const computedContext = await resolverService.executeNextEvent(
        events,
        compiledCodes,
        context,
      );
      expect(computedContext).toEqual(context);
    });

    it('Test Choice Event', async () => {
      // TODO
    });

    it('Test Parallel Event', async () => {
      const input = { test: 3 };
      const startEventName = 'test';
      const events: FlowEvents = {
        test: {
          type: 'Parallel',
          next: 'test',
          branches: [
            {
              startEventName: 'p1',
              events: {
                p1: {
                  type: 'Parallel',
                  next: 'test',
                  branches: [
                    {
                      startEventName: 'p2',
                      events: {
                        p2: {
                          type: 'Success',
                          output: "'hi'",
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
      const compiledCodes = {
        test: 'test',
        'test->0->p1': 'test',
        'test->0->p1->0->p2': 'test',
      };
      const context: ResolverContext = {
        parameter: input,
        input,
        output: null,
        next: null,
        index: 0,
        store: {},
        env: {},
        eventName: startEventName,
        parentEventNames: '',
        orgName: 'test',
        operatorId: undefined,
      };

      jest
        .spyOn(sandboxService, 'executeVM')
        .mockImplementation(async () => context);

      const computedContext = await resolverService.executeNextEvent(
        events,
        compiledCodes,
        context,
      );
      expect(computedContext).toEqual({ ...context, output: [[null]] });
    });
  });
});
