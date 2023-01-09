import { FlowEventRepeat } from '@shukun/schema';

import {
  createTestingSandbox,
  createTestingContext,
} from '../../util/unit-testing/sandbox-testing.helper';

import { compileRepeatEvent } from './compile-repeat';

describe('compileParallelEvent', () => {
  const { sandboxService } = createTestingSandbox();

  const event: FlowEventRepeat = {
    type: 'Repeat',
    next: 'next',
    repeatCount: '3',
    startEventName: 'repeat1',
  };

  it('should change next', async () => {
    const context = createTestingContext();
    const code = await compileRepeatEvent(event);
    const computedContext = await sandboxService.executeVM(code, context);

    expect(computedContext).toEqual({
      ...context,
      input: 3,
      next: 'next',
    });
  });
});
