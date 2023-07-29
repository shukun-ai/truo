import {
  flowRepositoryDefinition,
  routerRepositoryDefinition,
  simpleRepositoryDefinition,
  sourceQueryRepositoryDefinition,
} from '@shukun/presenter/definition';
import { RepositorySchema } from '@shukun/schema';

export const repositoryDefinitions: Record<string, RepositorySchema> = {
  router: routerRepositoryDefinition,
  simple: simpleRepositoryDefinition,
  sourceQuery: sourceQueryRepositoryDefinition,
  flow: flowRepositoryDefinition,
};
