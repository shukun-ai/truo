import { httpQuerySchema } from '@shukun/schema';

import { createBaseAjv } from '../../base-schema-validator/base-ajv';
import { SchemaValidator } from '../../base-schema-validator/schema-validator';

export const httpQuerySchemaValidator = new SchemaValidator(
  createBaseAjv(),
).compile(httpQuerySchema);
