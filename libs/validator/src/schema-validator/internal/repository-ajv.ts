import { repositorySchema } from '@shukun/schema';
import { Options } from 'ajv';

import { createBaseAjv } from './base-ajv';

export function createRepositoryAjv(options?: Options) {
  const validate = createBaseAjv(options).addSchema(
    repositorySchema,
    'repository.schema.json',
  );

  return validate;
}
