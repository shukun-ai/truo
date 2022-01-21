import { ApplicationSchema } from '../../types/application';
import { createAjv } from '../constructor/validate';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const applicationSchema = require('../../json-schemas/application.schema.json');

export const validateApplicationSchema =
  createAjv().compile<ApplicationSchema>(applicationSchema);
