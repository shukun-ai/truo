import {
  WorkflowConfigurations,
  workflowConfigurationsSchema,
} from '@shukun/schema';

import { createApplicationAjv } from '../../base-schema-validator/application-ajv';

export const validateWorkflowConfigurations =
  createApplicationAjv().compile<WorkflowConfigurations>(
    workflowConfigurationsSchema,
  );
