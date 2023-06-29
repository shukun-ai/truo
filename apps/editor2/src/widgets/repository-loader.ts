import { RepositorySchema } from '@shukun/schema';
import {
  flowRepositoryDefinition,
  simpleRepositoryDefinition,
  sourceQueryRepositoryDefinition,
} from '@shukun/widget';

export const repositoryDefinitions: Record<string, RepositorySchema> = {
  simple: simpleRepositoryDefinition,
  sourceQuery: sourceQueryRepositoryDefinition,
  flow: flowRepositoryDefinition,
};
