import { dataSourceSchema } from '@shukun/schema';

import { createBaseAjv } from '../../schema-validator/internal/base-ajv';
import { SchemaValidator } from '../../schema-validator/schema-validator';

export const dataSourceSchemaValidator = new SchemaValidator(
  createBaseAjv(),
).compile(dataSourceSchema);
