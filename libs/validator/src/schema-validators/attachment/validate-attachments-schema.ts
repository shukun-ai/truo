import { attachmentsSchema } from '@shukun/schema';

import { createBaseAjv } from '../../base-schema-validator/base-ajv';
import { SchemaValidator } from '../../base-schema-validator/schema-validator';

export const attachmentsSchemaValidator = new SchemaValidator(
  createBaseAjv(),
).compile(attachmentsSchema);
