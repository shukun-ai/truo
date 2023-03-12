import { widgetSchema } from '@shukun/schema';

import { createBaseAjv } from '../../schema-validator/internal/base-ajv';
import { SchemaValidator } from '../../schema-validator/schema-validator';

export const widgetSchemaValidator = new SchemaValidator(
  createBaseAjv(),
).compile(widgetSchema);
