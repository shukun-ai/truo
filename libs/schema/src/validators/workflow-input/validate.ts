import { createApplicationAjv } from '../constructor/application-ajv';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const workflowInputSchema = require('../../json-schemas/utils/workflow-input.schema.json');

export const validateWorkflowInput = createApplicationAjv({
  validateFormats: false,
  strict: false,
}).compile(workflowInputSchema);
