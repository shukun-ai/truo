import { RepositorySchema } from '@shukun/schema';
import {
  flowRepositoryDefinition,
  routerRepositoryDefinition,
  simpleRepositoryDefinition,
  sourceQueryRepositoryDefinition,
} from '@shukun/widget';

export const repositoryDefinitions: Record<string, RepositorySchema> = {
  router: routerRepositoryDefinition,
  simple: simpleRepositoryDefinition,
  sourceQuery: sourceQueryRepositoryDefinition,
  flow: flowRepositoryDefinition,
};
