import { IsEmptyArrayException, IsNotArrayException } from '@shukun/exception';
import { FlowEventLastOrThrow } from '@shukun/schema';

import { SandboxService } from '../../sandbox/sandbox.service';
import { createSandboxTesting } from '../../util/unit-testing/sandbox-testing.helper';

import { compileLastOrThrowEvent } from './compile-last-or-throw';

describe('compileLastOrThrowEvent', () => {
  let sandboxService: SandboxService;

  const event: FlowEventLastOrThrow = {
    type: 'LastOrThrow',
    next: 'next',
  };

  beforeAll(() => {
    const sandboxTesting = createSandboxTesting();
    sandboxService = sandboxTesting.sandboxService;
  });

  it('should return 9', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const context: any = {
      input: new Array(10).fill(1).map((item, index) => index),
    };
    const code = await compileLastOrThrowEvent(event);
    const computedContext = await sandboxService.executeVM(code, context);

    expect(computedContext).toEqual({
      ...context,
      input: 9,
      next: 'next',
    });
  });

  it('should return throw is not a array.', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const context: any = {
      input: {},
    };
    const code = await compileLastOrThrowEvent(event);

    expect(sandboxService.executeVM(code, context)).rejects.toThrow(
      new IsNotArrayException('The input is not a array.'),
    );
  });

  it('should return throw is a empty array.', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const context: any = {
      input: [],
    };
    const code = await compileLastOrThrowEvent(event);

    expect(sandboxService.executeVM(code, context)).rejects.toEqual(
      new IsEmptyArrayException('The input is a empty array.'),
    );
  });
});
