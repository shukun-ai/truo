import { workflowConfigurationsSchema } from '@shukun/schema';

import { createApplicationAjv } from '../../schema-validator/internal/application-ajv';
import { SchemaValidator } from '../../schema-validator/schema-validator';

export const workflowConfigurationsSchemaValidator = new SchemaValidator(
  createApplicationAjv(),
).compile(workflowConfigurationsSchema);
