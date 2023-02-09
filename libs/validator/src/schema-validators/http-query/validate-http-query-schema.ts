import { httpQuerySchema } from '@shukun/schema';

import { createBaseAjv } from '../../schema-validator/internal/base-ajv';
import { SchemaValidator } from '../../schema-validator/schema-validator';

export const httpQuerySchemaValidator = new SchemaValidator(
  createBaseAjv(),
).compile(httpQuerySchema);
