import { createAjv } from "../constructor/validate";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const workflowInputSchema = require("../../json-schemas/utils/workflow-input.schema.json");

export const validateWorkflowInput = createAjv({
  validateFormats: false,
  strict: false,
}).compile(workflowInputSchema);
