import { repositorySchema } from '@shukun/schema';

import { createRepositoryAjv } from '../../schema-validator/internal/repository-ajv';
import { SchemaValidator } from '../../schema-validator/schema-validator';

export const repositorySchemaValidator = new SchemaValidator(
  createRepositoryAjv(),
).compile(repositorySchema);
