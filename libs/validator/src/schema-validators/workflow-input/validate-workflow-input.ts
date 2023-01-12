import { workflowInputSchema } from '@shukun/schema';

import { createApplicationAjv } from '../../schema-validator/internal/application-ajv';
import { SchemaValidator } from '../../schema-validator/schema-validator';

export const workflowInputSchemaValidator = new SchemaValidator(
  createApplicationAjv({
    validateFormats: false,
    strict: false,
  }),
).compile(workflowInputSchema);
