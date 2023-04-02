import { presenterSchema } from '@shukun/schema';

import { createPresenterAjv } from '../../schema-validator/internal/presenter-ajv';
import { SchemaValidator } from '../../schema-validator/schema-validator';

export const presenterSchemaValidator = new SchemaValidator(
  createPresenterAjv(),
).compile(presenterSchema);
