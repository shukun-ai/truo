import { FlowEventStore } from '@shukun/schema';

import { DateResolverService } from '../../sandbox/resolvers/date-resolver.service';
import { SourceResolverService } from '../../sandbox/resolvers/source-resolver.service';
import { SandboxService } from '../../sandbox/sandbox.service';
import { mockEmptyDependencies } from '../../util/unit-testing/unit-testing.helper';

import { compileStoreEvent } from './compile-store';

describe('', () => {
  let sandboxService: SandboxService;
  let sourceResolverService: SourceResolverService;
  let dateResolverService: DateResolverService;

  const event: FlowEventStore = {
    type: 'Store',
    key: 'name',
    value: '$.input[0]',
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

  it('', async () => {
    const context: any = {
      input: new Array(10).fill(1).map((item, index) => index),
    };
    const code = await compileStoreEvent(event);
    const output = await sandboxService.executeVM(code, context);

    expect(output).toEqual({
      ...context,
      store: { name: 0 },
      output: context.input,
      next: 'next',
    });
  });
});
