import { WorkflowConfigurations } from '../../types/application';
import { createApplicationAjv } from '../constructor/application-ajv';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const workflowConfigurationsSchema = require('../../json-schemas/workflows/configurations.schema.json');

export const validateWorkflowConfigurations =
  createApplicationAjv().compile<WorkflowConfigurations>(
    workflowConfigurationsSchema,
  );
