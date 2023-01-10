import { ValidateFunction } from 'ajv';

export function stringifyValidateErrors(validate: ValidateFunction): string {
  return JSON.stringify(validate.errors);
}
