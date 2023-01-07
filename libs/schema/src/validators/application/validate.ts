import { ApplicationSchema } from '../../types/application';
import { createApplicationAjv } from '../constructor/application-ajv';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const applicationSchema = require('../../json-schemas/application.schema.json');

export const validateApplicationSchema =
  createApplicationAjv().compile<ApplicationSchema>(applicationSchema);
