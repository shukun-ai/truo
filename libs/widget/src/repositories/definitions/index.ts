import { RepositorySchema } from '@shukun/schema';

import flowRepositoryDefinitionJson from './flow.repository.json';
import simpleRepositoryDefinitionJson from './simple.repository.json';
import sourceQueryRepositoryDefinitionJson from './source-query.repository.json';

export const flowRepositoryDefinition =
  flowRepositoryDefinitionJson as unknown as RepositorySchema;
export const simpleRepositoryDefinition =
  simpleRepositoryDefinitionJson as unknown as RepositorySchema;
export const sourceQueryRepositoryDefinition =
  sourceQueryRepositoryDefinitionJson as unknown as RepositorySchema;
