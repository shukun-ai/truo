import { workflowInputSchema } from '@shukun/schema';

import { createApplicationAjv } from '../../base-schema-validator/application-ajv';
import { SchemaValidator } from '../../base-schema-validator/schema-validator';

export const workflowInputSchemaValidator = new SchemaValidator(
  createApplicationAjv({
    validateFormats: false,
    strict: false,
  }),
).compile(workflowInputSchema);
