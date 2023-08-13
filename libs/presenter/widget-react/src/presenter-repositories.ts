import { Repository } from '@shukun/presenter/definition';

import { authRepository } from './repositories/auth/auth.repository';
import { routerRepository } from './repositories/router/router.repository';
import { sourceQueryRepository } from './repositories/source-query/source-query.repository';
import { temporaryRepository } from './repositories/temporary/temporary.repository';

export const presenterRepositories: Record<string, Repository> = {
  auth: authRepository,
  router: routerRepository,
  temporary: sourceQueryRepository,
  sourceQuery: temporaryRepository,
};
