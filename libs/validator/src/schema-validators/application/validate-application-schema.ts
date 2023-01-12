import { applicationSchema } from '@shukun/schema';

import { createApplicationAjv } from '../../base-schema-validator/application-ajv';
import { SchemaValidator } from '../../base-schema-validator/schema-validator';

export const applicationSchemaValidator = new SchemaValidator(
  createApplicationAjv(),
).compile(applicationSchema);
