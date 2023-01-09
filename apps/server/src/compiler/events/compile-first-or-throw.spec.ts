import { IsEmptyArrayException, IsNotArrayException } from '@shukun/exception';
import { FlowEventFirstOrThrow } from '@shukun/schema';

import { SandboxService } from '../../sandbox/sandbox.service';
import { createSandboxTesting } from '../../util/unit-testing/sandbox-testing.helper';

import { compileFirstOrThrowEvent } from './compile-first-or-throw';

describe('compileFirstOrThrowEvent', () => {
  let sandboxService: SandboxService;

  const event: FlowEventFirstOrThrow = {
    type: 'FirstOrThrow',
    next: 'next',
  };

  beforeAll(() => {
    const sandboxTesting = createSandboxTesting();
    sandboxService = sandboxTesting.sandboxService;
  });

  it('should return 0', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const context: any = {
      input: new Array(10).fill(1).map((item, index) => index),
    };
    const code = await compileFirstOrThrowEvent(event);
    const computedContext = await sandboxService.executeVM(code, context);

    expect(computedContext).toEqual({
      ...context,
      input: 0,
      next: 'next',
    });
  });

  it('should return throw is not a array.', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const context: any = {
      input: {},
    };
    const code = await compileFirstOrThrowEvent(event);

    expect(sandboxService.executeVM(code, context)).rejects.toThrow(
      new IsNotArrayException('The input is not a array.'),
    );
  });

  it('should return throw is a empty array.', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const context: any = {
      input: [],
    };
    const code = await compileFirstOrThrowEvent(event);

    expect(sandboxService.executeVM(code, context)).rejects.toEqual(
      new IsEmptyArrayException('The input is a empty array.'),
    );
  });
});
