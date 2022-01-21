import * as workflowInputSchema from "../../json-schemas/utils/workflow-input.schema.json";
import { createAjv } from "../constructor/validate";

export const validateWorkflowInput = createAjv({
  validateFormats: false,
  strict: false,
}).compile(workflowInputSchema);
