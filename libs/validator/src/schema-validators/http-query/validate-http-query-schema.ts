import { HttpQuerySchema, httpQuerySchema } from '@shukun/schema';
import Ajv from 'ajv';

export const validateHttpQuerySchema = new Ajv().compile<HttpQuerySchema>(
  httpQuerySchema,
);
