import { DateResolverService } from '../../sandbox/resolvers/date-resolver.service';
import { SourceResolverService } from '../../sandbox/resolvers/source-resolver.service';
import { SandboxContext } from '../../sandbox/sandbox.interface';
import { SandboxService } from '../../sandbox/sandbox.service';

import { mockEmptyDependencies } from './unit-testing.helper';

export function createTestingSandbox() {
  const sourceResolverService = new SourceResolverService(
    mockEmptyDependencies(),
  );
  const dateResolverService = new DateResolverService();
  const sandboxService = new SandboxService(
    sourceResolverService,
    dateResolverService,
  );

  return {
    sandboxService,
    sourceResolverService,
    dateResolverService,
  };
}

export function createTestingContext(
  context?: Partial<SandboxContext>,
): SandboxContext {
  const defaultContext: SandboxContext = {
    input: 'Hello World!',
    next: '',
    index: 0,
    env: {},
    store: {},
    orgName: 'mockOrgName',
    operatorId: undefined,
  };
  return {
    ...defaultContext,
    ...context,
  };
}
