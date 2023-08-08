import { IRepository } from '@shukun/presenter/definition';

import { Class } from 'utility-types';

import { AuthRepository } from './repositories/auth/auth.repository';
import { RouterRepository } from './repositories/router/router.repository';
import { SourceQueryRepository } from './repositories/source-query/source-query.repository';
import { TemporaryRepository } from './repositories/temporary/temporary.repository';

export const presenterRepositories: Record<string, Class<IRepository>> = {
  auth: AuthRepository,
  router: RouterRepository,
  temporary: SourceQueryRepository,
  sourceQuery: TemporaryRepository,
};
