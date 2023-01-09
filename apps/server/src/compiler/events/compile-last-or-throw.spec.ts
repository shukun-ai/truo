import { IsEmptyArrayException, IsNotArrayException } from '@shukun/exception';
import { FlowEventLastOrThrow } from '@shukun/schema';

import { DateResolverService } from '../../sandbox/resolvers/date-resolver.service';

import { SourceResolverService } from '../../sandbox/resolvers/source-resolver.service';

import { SandboxService } from '../../sandbox/sandbox.service';
import { mockEmptyDependencies } from '../../util/unit-testing/unit-testing.helper';

import { compileLastOrThrowEvent } from './compile-last-or-throw';

describe('compileLastOrThrowEvent', () => {
  let sandboxService: SandboxService;
  let sourceResolverService: SourceResolverService;
  let dateResolverService: DateResolverService;

  const event: FlowEventLastOrThrow = {
    type: 'LastOrThrow',
    next: 'next',
  };

  beforeAll(() => {
    sourceResolverService = new SourceResolverService(mockEmptyDependencies());
    dateResolverService = new DateResolverService();
    sandboxService = new SandboxService(
      sourceResolverService,
      dateResolverService,
    );
  });

  it('should return 9', async () => {
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
    const context: any = {
      input: {},
    };
    const code = await compileLastOrThrowEvent(event);

    expect(sandboxService.executeVM(code, context)).rejects.toThrow(
      new IsNotArrayException('The input is not a array.'),
    );
  });

  it('should return throw is a empty array.', async () => {
    const context: any = {
      input: [],
    };
    const code = await compileLastOrThrowEvent(event);

    expect(sandboxService.executeVM(code, context)).rejects.toEqual(
      new IsEmptyArrayException('The input is a empty array.'),
    );
  });
});
