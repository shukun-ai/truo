import { ValidateFunction } from 'ajv';

/**
 * @remark
 * Convince for debug if validate gets errors
 */
export function inspectTestingValidate(
  result: boolean,
  validate: ValidateFunction,
) {
  if (!result) {
    console.error(JSON.stringify(validate.errors, null, 2));
  }
}
