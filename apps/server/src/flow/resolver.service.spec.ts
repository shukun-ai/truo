import { FlowEvents } from '@shukun/schema';

import { NestedEventService } from '../compiler/nested-event.service';
import { FlowDefinitionException } from '../exceptions/flow-definition-exception';
import { FlowNoCompiledCodeException } from '../exceptions/flow-no-compiled-code-exception';
import { FlowRepeatCountException } from '../exceptions/flow-repeat-count-exception';

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

    it('FlowDefinitionException', async () => {
      const input = { test: 3 };
      const events: FlowEvents = {
        test: {
          type: 'Repeat',
          next: '',
          repeatCount: 'it is a string',
          startEventName: 'p1',
          events: {},
        },
      };
      const compiledCodes = {
        test: `
          async function main($, $$, $$$){
            return {
              ...$,
              output: 'it is a string',
              next: ""
            };
          };
          exports.default=main;
        `,
      };
      const context: ResolverContext = {
        parameter: input,
        input,
        output: null,
        next: 'noThisEvent',
        index: 0,
        store: {},
        env: {},
        parentEventNames: '',
        orgName: 'test',
        operatorId: undefined,
      };

      expect(
        resolverService.executeNextEvent(events, compiledCodes, context),
      ).rejects.toThrow(
        new FlowDefinitionException('Did not find event: {{eventName}}'),
      );
    });

    it('FlowNoCompiledCodeException', async () => {
      const input = { test: 3 };
      const events: FlowEvents = {
        test: {
          type: 'Repeat',
          next: '',
          repeatCount: 'it is a string',
          startEventName: 'p1',
          events: {},
        },
      };
      const compiledCodes = {
        noThisEvent: `
          async function main($, $$, $$$){
            return {
              ...$,
              output: 'it is a string',
              next: ""
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

      expect(
        resolverService.executeNextEvent(events, compiledCodes, context),
      ).rejects.toThrow(
        new FlowNoCompiledCodeException(
          'Did not find compiled code: {{nestedEventName}}.',
        ),
      );
    });
  });

  describe('Test Repeat Event', () => {
    it('Test Repeat Event', async () => {
      const input = { test: 3 };
      const events: FlowEvents = {
        test: {
          type: 'Repeat',
          next: '',
          repeatCount: '2',
          startEventName: 'p1',
          events: {
            p1: {
              type: 'Repeat',
              next: '',
              repeatCount: '2',
              startEventName: 'p2',
              events: {
                p2: {
                  type: 'SourceQuery',
                  atomName: 'mock',
                  query: {},
                  next: 'p3',
                },
                p3: {
                  type: 'SourceQuery',
                  atomName: 'mock',
                  query: {},
                  next: '',
                },
              },
            },
          },
        },
      };
      const compiledCodes = {
        test: `
          async function main($, $$, $$$){
            return {
              ...$,
              output: 2,
              next: ""
            };
          };
          exports.default=main;
        `,
        'test->p1': `
          async function main($, $$, $$$){
            return {
              ...$,
              output: 2,
              next: ""
            };
          };
          exports.default=main;
        `,
        'test->p1->p2': `
        async function main($, $$, $$$){
          return {
            ...$,
            output: $.parameter.test,
            next: "p3"
          };
        };
        exports.default=main;
        `,
        'test->p1->p3': `
        async function main($, $$, $$$){
          return {
            ...$,
            output: $.input + 2,
            next: ""
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
        input: [
          [5, 5],
          [5, 5],
        ],
        output: [
          [5, 5],
          [5, 5],
        ],
        next: '',
      });
    });

    it('FlowRepeatCountException', async () => {
      const input = { test: 3 };
      const events: FlowEvents = {
        test: {
          type: 'Repeat',
          next: '',
          repeatCount: '"this is not a number"',
          startEventName: 'p1',
          events: {},
        },
      };
      const compiledCodes = {
        test: `
          async function main($, $$, $$$){
            return {
              ...$,
              output: "this is not a number",
              next: ""
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

      expect(
        resolverService.executeNextEvent(events, compiledCodes, context),
      ).rejects.toThrow(
        new FlowRepeatCountException(
          'The repeatCount is not number type: {{ repeatCount }}.',
        ),
      );
    });

    it('FlowDefinitionException', async () => {
      const input = { test: 3 };
      const events: FlowEvents = {
        test: {
          type: 'Repeat',
          next: '',
          repeatCount: '1001',
          startEventName: 'p1',
          events: {},
        },
      };
      const compiledCodes = {
        test: `
          async function main($, $$, $$$){
            return {
              ...$,
              output: 1001,
              next: ""
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

      expect(
        resolverService.executeNextEvent(events, compiledCodes, context),
      ).rejects.toThrow(
        new FlowDefinitionException(
          'The repeat count is more than max value: {{ count }}',
        ),
      );
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
