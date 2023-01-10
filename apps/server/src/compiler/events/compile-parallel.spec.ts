import { FlowEventParallel } from '@shukun/schema';

import { SandboxService } from '../../sandbox/sandbox.service';
import {
  createTestingSandbox,
  createTestingContext,
} from '../../util/unit-testing/sandbox-testing.helper';
import { compileCommonWrapper } from '../wrappers/compile-common-wrapper';

import { compileParallelEvent } from './compile-parallel';

describe('compileParallelEvent', () => {
  let sandboxService: SandboxService;

  const event: FlowEventParallel = {
    type: 'Parallel',
    next: 'next',
    branches: [
      {
        startEventName: 'parallel1',
      },
      {
        startEventName: 'parallel2',
      },
    ],
  };

  beforeAll(() => {
    const sandboxTesting = createTestingSandbox();
    sandboxService = sandboxTesting.sandboxService;
  });

  it('should change next', async () => {
    const context = createTestingContext();
    const code = await compileParallelEvent(event);
    const wrappedCode = await compileCommonWrapper(code);
    const computedContext = await sandboxService.executeVM(
      wrappedCode,
      context,
    );

    expect(computedContext).toEqual({
      ...context,
      next: 'next',
    });
  });
});
