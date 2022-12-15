import { FlowEventFirstOrThrow } from '@shukun/schema';

import { IsEmptyArrayException } from '../../exceptions/is-empty-array';

import { IsNotArrayException } from '../../exceptions/is-not-array';

import { SourceResolverService } from '../../sandbox/resolvers/source-resolver.service';

import { SandboxService } from '../../sandbox/sandbox.service';
import { mockEmptyDependencies } from '../../util/unit-testing/unit-testing.helper';

import { compileFirstOrThrowEvent } from './compile-first-or-throw';

describe('compileFirstOrThrowEvent', () => {
  let sandboxService: SandboxService;
  let sourceResolverService: SourceResolverService;

  const event: FlowEventFirstOrThrow = {
    type: 'FirstOrThrow',
    next: 'next',
  };

  beforeAll(() => {
    sourceResolverService = new SourceResolverService(mockEmptyDependencies());
    sandboxService = new SandboxService(sourceResolverService);
  });

  it('should return 0', async () => {
    const context: any = {
      input: new Array(10).fill(1).map((item, index) => index),
    };
    const code = await compileFirstOrThrowEvent(event);
    const output = await sandboxService.executeVM(code, context);

    expect(output).toEqual({
      ...context,
      output: 0,
      next: 'next',
    });
  });

  it('should return throw is not a array.', async () => {
    const context: any = {
      input: {},
    };
    const code = await compileFirstOrThrowEvent(event);

    expect(sandboxService.executeVM(code, context)).rejects.toThrow(
      new IsNotArrayException('The input is not a array.'),
    );
  });

  it('should return throw is a empty array.', async () => {
    const context: any = {
      input: [],
    };
    const code = await compileFirstOrThrowEvent(event);

    expect(sandboxService.executeVM(code, context)).rejects.toEqual(
      new IsEmptyArrayException('The input is a empty array.'),
    );
  });
});
