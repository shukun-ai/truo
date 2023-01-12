import { ApplicationSchema, applicationSchema } from '@shukun/schema';

import { createApplicationAjv } from '../../base-schema-validator/application-ajv';

export const validateApplicationSchema =
  createApplicationAjv().compile<ApplicationSchema>(applicationSchema);
