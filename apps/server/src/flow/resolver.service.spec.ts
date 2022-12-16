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
    sandboxService = new SandboxService(
      mockEmptyDependencies(),
      mockEmptyDependencies(),
    );

    resolverService = new ResolverService(nestedEventService, sandboxService);
  });

  describe('Test Common Event', () => {
    it('Test Common Event', async () => {
      const input = { test: 3 };
      const events: FlowEvents = {
        test: {
          type: 'SourceQuery',
          atomName: 'mock',
          query: {},
          next: '',
        },
      };
      const compiledCodes = {
        test: `
        async function main($, $$, $$$){
          return {
            ...$,
            output: 'hi',
            next: ''
          };
        };
        exports.default=main;`,
      };
      const context: ResolverContext = {
        parameter: input,
        input,
        output: null,
        next: 'test',
        index: 0,
        store: {},
        env: {},
        parentEventNames: '',
        orgName: 'test',
        operatorId: undefined,
      };

      const computedContext = await resolverService.executeNextEvent(
        events,
        compiledCodes,
        context,
      );
      expect(computedContext).toEqual({
        ...context,
        input: 'hi',
        output: 'hi',
        next: '',
      });
    });
  });

  describe('Test Repeat Event', () => {
    it('Test Repeat Event', async () => {
      // TODO
    });
  });

  describe('Test Parallel Event', () => {
    it('Test Parallel Event', async () => {
      const input = { test: 3 };
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
                          type: 'SourceQuery',
                          atomName: 'mock',
                          query: {},
                          next: '',
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
        test: `
          async function main($, $$, $$$){
            return {
              ...$,
              next: ''
            };
          };
          exports.default=main;
        `,
        'test->0->p1': `
          async function main($, $$, $$$){
            return {
              ...$,
              next: ''
            };
          };
          exports.default=main;
        `,
        'test->0->p1->0->p2': `
        async function main($, $$, $$$){
          return {
            ...$,
            output: $.input.test,
            next: ''
          };
        };
        exports.default=main;
        `,
      };
      const context: ResolverContext = {
        parameter: input,
        input,
        output: null,
        next: 'test',
        index: 0,
        store: {},
        env: {},
        parentEventNames: '',
        orgName: 'test',
        operatorId: undefined,
      };

      const computedContext = await resolverService.executeNextEvent(
        events,
        compiledCodes,
        context,
      );
      expect(computedContext).toEqual({
        ...context,
        input: [[3]],
        output: [[3]],
        next: '',
      });
    });
  });
});
