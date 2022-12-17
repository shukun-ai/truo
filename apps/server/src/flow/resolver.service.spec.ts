import { FlowEvents } from '@shukun/schema';

import { FlowDefinitionException } from '../exceptions/flow-definition-exception';
import { FlowNoCompiledCodeException } from '../exceptions/flow-no-compiled-code-exception';
import { FlowRepeatCountException } from '../exceptions/flow-repeat-count-exception';

import { SandboxContext } from '../sandbox/sandbox.interface';
import { SandboxService } from '../sandbox/sandbox.service';
import { mockEmptyDependencies } from '../util/unit-testing/unit-testing.helper';

import { ResolverService } from './resolver.service';

describe('ResolverService', () => {
  let resolverService: ResolverService;
  let sandboxService: SandboxService;

  beforeEach(() => {
    sandboxService = new SandboxService(
      mockEmptyDependencies(),
      mockEmptyDependencies(),
    );

    resolverService = new ResolverService(sandboxService);
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
            input: 'hi',
            next: ''
          };
        };
        exports.default=main;`,
      };
      const context: SandboxContext = {
        parameter: input,
        input,
        next: 'test',
        index: 0,
        store: {},
        env: {},
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
              input: 'it is a string',
              next: ""
            };
          };
          exports.default=main;
        `,
      };
      const context: SandboxContext = {
        parameter: input,
        input,
        next: 'noThisEvent',
        index: 0,
        store: {},
        env: {},
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
        },
      };
      const compiledCodes = {
        noThisEvent: `
          async function main($, $$, $$$){
            return {
              ...$,
              input: 'it is a string',
              next: ""
            };
          };
          exports.default=main;
        `,
      };
      const context: SandboxContext = {
        parameter: input,
        input,
        next: 'test',
        index: 0,
        store: {},
        env: {},
        orgName: 'test',
        operatorId: undefined,
      };

      expect(
        resolverService.executeNextEvent(events, compiledCodes, context),
      ).rejects.toThrow(
        new FlowNoCompiledCodeException(
          'Did not find compiled code: {{eventName}}.',
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
        },
        p1: {
          type: 'Repeat',
          next: '',
          repeatCount: '2',
          startEventName: 'p2',
        },
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
      };
      const compiledCodes = {
        test: `
          async function main($, $$, $$$){
            return {
              ...$,
              input: 2,
              next: ""
            };
          };
          exports.default=main;
        `,
        p1: `
          async function main($, $$, $$$){
            return {
              ...$,
              input: 2,
              next: ""
            };
          };
          exports.default=main;
        `,
        p2: `
        async function main($, $$, $$$){
          return {
            ...$,
            input: $.parameter.test,
            next: "p3"
          };
        };
        exports.default=main;
        `,
        p3: `
        async function main($, $$, $$$){
          return {
            ...$,
            input: $.input + 2,
            next: ""
          };
        };
        exports.default=main;
        `,
      };
      const context: SandboxContext = {
        parameter: input,
        input,
        next: 'test',
        index: 0,
        store: {},
        env: {},
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
              input: "this is not a number",
              next: ""
            };
          };
          exports.default=main;
        `,
      };
      const context: SandboxContext = {
        parameter: input,
        input,
        next: 'test',
        index: 0,
        store: {},
        env: {},
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
              input: 1001,
              next: ""
            };
          };
          exports.default=main;
        `,
      };
      const context: SandboxContext = {
        parameter: input,
        input,
        next: 'test',
        index: 0,
        store: {},
        env: {},
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
            },
          ],
        },
        p1: {
          type: 'Parallel',
          next: 'test',
          branches: [
            {
              startEventName: 'p2',
            },
          ],
        },
        p2: {
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
              next: ''
            };
          };
          exports.default=main;
        `,
        p1: `
          async function main($, $$, $$$){
            return {
              ...$,
              next: ''
            };
          };
          exports.default=main;
        `,
        p2: `
        async function main($, $$, $$$){
          return {
            ...$,
            input: $.input.test,
            next: ''
          };
        };
        exports.default=main;
        `,
      };
      const context: SandboxContext = {
        parameter: input,
        input,
        next: 'test',
        index: 0,
        store: {},
        env: {},
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
        next: '',
      });
    });
  });
});
