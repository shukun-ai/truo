import Ajv from 'ajv';

import { HttpQuerySchema } from '../../types/http-query-override';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const httpQuerySchema = require('../../json-schemas/http-query.schema.json');

export const validateHttpQuerySchema = new Ajv().compile<HttpQuerySchema>(
  httpQuerySchema,
);
