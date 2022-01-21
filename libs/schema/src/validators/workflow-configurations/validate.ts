import { WorkflowConfigurations } from '../../types/application';
import { createAjv } from '../constructor/validate';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const workflowConfigurationsSchema = require('../../json-schemas/workflows/configurations.schema.json');

export const validateWorkflowConfigurations =
  createAjv().compile<WorkflowConfigurations>(workflowConfigurationsSchema);
