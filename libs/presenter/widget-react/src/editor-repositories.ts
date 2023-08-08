import { RepositorySchema } from '@shukun/schema';

import authJson from './repositories/auth/auth.repository.json';
import routerJson from './repositories/router/router.repository.json';
import sourceQueryJson from './repositories/source-query/source-query.repository.json';
import temporaryJson from './repositories/temporary/temporary.repository.json';

export const editorRepositories: Record<string, RepositorySchema> = {
  auth: authJson as RepositorySchema,
  router: routerJson as RepositorySchema,
  temporary: temporaryJson as RepositorySchema,
  sourceQuery: sourceQueryJson as RepositorySchema,
};
