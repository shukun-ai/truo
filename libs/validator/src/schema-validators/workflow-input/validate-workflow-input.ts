import { workflowInputSchema } from '@shukun/schema';

import { createApplicationAjv } from '../../base-schema-validator/application-ajv';

export const validateWorkflowInput = createApplicationAjv({
  validateFormats: false,
  strict: false,
}).compile(workflowInputSchema);
