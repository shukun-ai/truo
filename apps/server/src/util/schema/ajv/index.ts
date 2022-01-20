import Ajv from 'ajv';
import { isEmail, isISO8601 } from 'class-validator';

export const ajv = new Ajv();

ajv.addFormat('email', {
  type: 'string',
  validate: (value: string) => isEmail(value),
});

ajv.addFormat('dateTimeISO', {
  type: 'string',
  validate: (value: string) => isISO8601(value, { strict: true }),
});
