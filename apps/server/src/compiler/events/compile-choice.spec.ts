import { FlowEventChoice } from '@shukun/schema';

import { SandboxService } from '../../sandbox/sandbox.service';
import { createSandboxTesting } from '../../util/unit-testing/sandbox-testing.helper';

import { compileChoiceEvent } from './compile-choice';

describe('compileChoiceEvent', () => {
  let sandboxService: SandboxService;

  const event: FlowEventChoice = {
    type: 'Choice',
    next: 'default',
    conditions: [
      {
        condition: '$.input === 1',
        next: 'first',
      },
      {
        condition: '$.input === 2',
        next: 'second',
      },
    ],
  };

  beforeAll(() => {
    const sandboxTesting = createSandboxTesting();
    sandboxService = sandboxTesting.sandboxService;
  });

  it('should return first', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const context: any = {
      input: 1,
    };
    const code = await compileChoiceEvent(event);
    const computedContext = await sandboxService.executeVM(code, context);

    expect(computedContext).toEqual({
      ...context,
      input: 1,
      next: 'first',
    });
  });

  it('should return throw is not a array.', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const context: any = {
      input: 2,
    };
    const code = await compileChoiceEvent(event);
    const computedContext = await sandboxService.executeVM(code, context);

    expect(computedContext).toEqual({
      ...context,
      input: 2,
      next: 'second',
    });
  });

  it('should return throw is a empty array.', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const context: any = {
      input: null,
    };
    const code = await compileChoiceEvent(event);
    const computedContext = await sandboxService.executeVM(code, context);

    expect(computedContext).toEqual({
      ...context,
      input: null,
      next: 'default',
    });
  });
});
