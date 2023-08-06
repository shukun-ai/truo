import { RepositorySchema } from '@shukun/schema';

import connectorRepositoryJson from './connector.repository.json';
import routerRepositoryJson from './router.repository.json';
import sourceQueryRepositoryJson from './source-query.repository.json';
import temporaryRepositoryJson from './temporary.repository.json';

export const editorRepositories: Record<string, RepositorySchema> = {
  router: routerRepositoryJson as RepositorySchema,
  connector: connectorRepositoryJson as RepositorySchema,
  temporary: temporaryRepositoryJson as RepositorySchema,
  sourceQuery: sourceQueryRepositoryJson as RepositorySchema,
};
