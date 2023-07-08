import { TypeException } from '@shukun/exception';
import { ConnectorTask } from '@shukun/schema';

import { HandlerContext } from '../internal/types';

import { handleChoiceTask } from './handle-choice-task';

describe('handle-choice-task', () => {
  describe('handleChoiceTask', () => {
    const context: HandlerContext = {
      input: null,
      next: undefined,
      index: 0,
      env: {},
      store: {},
      orgName: 'shukun',
      operatorId: undefined,
      taskDefinitions: {},
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      connector: undefined as any,
    };

    it('get the first choice.', () => {
      const task: ConnectorTask = {
        type: 'choice',
        next: 'third',
        parameters: {
          conditions: [
            {
              next: 'first',
              condition: true,
            },
            {
              next: 'second',
              condition: false,
            },
          ],
        },
      };

      const output = handleChoiceTask(task, context);
      expect(output).toEqual({
        ...context,
        next: 'first',
      });
    });

    it('get the default choice.', () => {
      const task: ConnectorTask = {
        type: 'choice',
        next: 'third',
        parameters: {
          conditions: [
            {
              next: 'first',
              condition: false,
            },
            {
              next: 'second',
              condition: false,
            },
          ],
        },
      };

      const output = handleChoiceTask(task, context);
      expect(output).toEqual({
        ...context,
        next: 'third',
      });
    });

    it('Throw condition error', () => {
      const task: ConnectorTask = {
        type: 'choice',
        next: 'third',
        parameters: {
          conditions: [
            {
              next: 'first',
              condition: 0,
            },
            {
              next: 'second',
              condition: 1,
            },
          ],
        },
      };

      expect(() => handleChoiceTask(task, context)).toThrowError(
        new TypeException('The result of condition value is not boolean.'),
      );
    });
  });
});
