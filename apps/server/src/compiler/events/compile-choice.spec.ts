import { FlowEventChoice } from '@shukun/schema';

import { DateResolverService } from '../../sandbox/resolvers/date-resolver.service';

import { SourceResolverService } from '../../sandbox/resolvers/source-resolver.service';

import { SandboxService } from '../../sandbox/sandbox.service';
import { mockEmptyDependencies } from '../../util/unit-testing/unit-testing.helper';

import { compileChoiceEvent } from './compile-choice';

describe('compileChoiceEvent', () => {
  let sandboxService: SandboxService;
  let sourceResolverService: SourceResolverService;
  let dateResolverService: DateResolverService;

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
    sourceResolverService = new SourceResolverService(mockEmptyDependencies());
    dateResolverService = new DateResolverService();
    sandboxService = new SandboxService(
      sourceResolverService,
      dateResolverService,
    );
  });

  it('should return first', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const context: any = {
      input: 1,
    };
    const code = await compileChoiceEvent(event);
    const output = await sandboxService.executeVM(code, context);

    expect(output).toEqual({
      ...context,
      output: 1,
      next: 'first',
    });
  });

  it('should return throw is not a array.', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const context: any = {
      input: 2,
    };
    const code = await compileChoiceEvent(event);
    const output = await sandboxService.executeVM(code, context);

    expect(output).toEqual({
      ...context,
      output: 2,
      next: 'second',
    });
  });

  it('should return throw is a empty array.', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const context: any = {
      input: null,
    };
    const code = await compileChoiceEvent(event);
    const output = await sandboxService.executeVM(code, context);

    expect(output).toEqual({
      ...context,
      output: null,
      next: 'default',
    });
  });
});
