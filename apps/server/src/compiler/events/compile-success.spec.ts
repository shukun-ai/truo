import { FlowEventSuccess } from '@shukun/schema';

import { SandboxService } from '../../sandbox/sandbox.service';

import {
  createTestingSandbox,
  createTestingContext,
} from '../../util/unit-testing/sandbox-testing.helper';
import { compileCommonWrapper } from '../wrappers/compile-common-wrapper';

import { compileSuccessEvent } from './compile-success';

describe('compileSuccessEvent', () => {
  let sandboxService: SandboxService;
  let event: FlowEventSuccess;

  beforeAll(() => {
    const testingSandbox = createTestingSandbox();
    sandboxService = testingSandbox.sandboxService;

    event = {
      type: 'Success',
      output: `{ name: 'mockName' }`,
    };
  });

  it('Should return new next and input.', async () => {
    const context = createTestingContext();
    const code = await compileSuccessEvent(event);
    const wrappedCode = await compileCommonWrapper(code);
    const computedContext = await sandboxService.executeVM(
      wrappedCode,
      context,
    );

    expect(computedContext).toEqual({
      ...context,
      input: { name: 'mockName' },
      next: '',
    });
  });
});
