import { FlowEventFail } from '@shukun/schema';

import { SandboxService } from '../../sandbox/sandbox.service';

import {
  createTestingSandbox,
  createTestingContext,
} from '../../util/unit-testing/sandbox-testing.helper';
import { compileCommonWrapper } from '../wrappers/compile-common-wrapper';

import { compileFailEvent } from './compile-fail';

describe('compileFailEvent', () => {
  let sandboxService: SandboxService;
  let event: FlowEventFail;

  beforeAll(() => {
    const testingSandbox = createTestingSandbox();
    sandboxService = testingSandbox.sandboxService;

    event = {
      type: 'Fail',
      output: `{ name: 'mockName' }`,
    };
  });

  it('Should return new next and input.', async () => {
    const context = createTestingContext();
    const code = await compileFailEvent(event);
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
