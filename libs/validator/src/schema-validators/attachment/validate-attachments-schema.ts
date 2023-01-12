import { attachmentsSchema } from '@shukun/schema';

import { createBaseAjv } from '../../schema-validator/internal/base-ajv';
import { SchemaValidator } from '../../schema-validator/schema-validator';

export const attachmentsSchemaValidator = new SchemaValidator(
  createBaseAjv(),
).compile(attachmentsSchema);
