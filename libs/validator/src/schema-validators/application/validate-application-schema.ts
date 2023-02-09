import { applicationSchema } from '@shukun/schema';

import { createApplicationAjv } from '../../schema-validator/internal/application-ajv';
import { SchemaValidator } from '../../schema-validator/schema-validator';

export const applicationSchemaValidator = new SchemaValidator(
  createApplicationAjv(),
).compile(applicationSchema);
