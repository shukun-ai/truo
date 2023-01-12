import Ajv, { Options } from 'ajv';
import { isEmail, isISO8601 } from 'class-validator';

/**
 * @deprecated
 */
export function createBaseAjv(options?: Options) {
  return new Ajv(options)
    .addKeyword('tsEnumNames')
    .addKeyword('skEditorType')
    .addFormat('email', {
      type: 'string',
      validate: (value: string) => isEmail(value),
    })
    .addFormat('dateTimeISO', {
      type: 'string',
      validate: (value: string) => isISO8601(value, { strict: true }),
    })
    .addFormat('apiName', {
      type: 'string',
      validate: (value: string) => {
        const regex = new RegExp(/^[a-z0-9_]*$/);
        return regex.test(value);
      },
    });
}
