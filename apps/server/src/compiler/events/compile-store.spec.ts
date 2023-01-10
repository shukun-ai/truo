import { FlowEventStore } from '@shukun/schema';

import { SandboxService } from '../../sandbox/sandbox.service';
import { createTestingSandbox } from '../../util/unit-testing/sandbox-testing.helper';
import { compileCommonWrapper } from '../wrappers/compile-common-wrapper';

import { compileStoreEvent } from './compile-store';

describe('', () => {
  let sandboxService: SandboxService;

  const event: FlowEventStore = {
    type: 'Store',
    key: 'name',
    value: '$.input[0]',
    next: 'next',
  };

  beforeAll(() => {
    const sandboxTesting = createTestingSandbox();
    sandboxService = sandboxTesting.sandboxService;
  });

  it('', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const context: any = {
      input: new Array(10).fill(1).map((item, index) => index),
    };
    const code = await compileStoreEvent(event);
    const wrappedCode = await compileCommonWrapper(code);
    const computedContext = await sandboxService.executeVM(
      wrappedCode,
      context,
    );

    expect(computedContext).toEqual({
      ...context,
      store: { name: 0 },
      next: 'next',
    });
  });
});
