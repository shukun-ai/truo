import { DateResolverService } from '../../sandbox/resolvers/date-resolver.service';
import { SourceResolverService } from '../../sandbox/resolvers/source-resolver.service';
import { SandboxService } from '../../sandbox/sandbox.service';

import { mockEmptyDependencies } from './unit-testing.helper';

export function createSandboxTesting() {
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
