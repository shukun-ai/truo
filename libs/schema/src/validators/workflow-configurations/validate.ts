import * as workflowConfigurationsSchema from "../../json-schemas/workflows/configurations.schema.json";
import { WorkflowConfigurations } from "../../types/application";
import { createAjv } from "../constructor/validate";

export const validateWorkflowConfigurations =
  createAjv().compile<WorkflowConfigurations>(workflowConfigurationsSchema);
