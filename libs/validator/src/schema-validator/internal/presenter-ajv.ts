import { presenterSchema } from '@shukun/schema';
import { Options } from 'ajv';

import { createBaseAjv } from './base-ajv';

export function createPresenterAjv(options?: Options) {
  const validate = createBaseAjv(options).addSchema(
    presenterSchema,
    'presenter.schema.json',
  );

  return validate;
}
