import sourceSchema from '../../json-schemas/source.schema.json';
import { SourceSchema } from '../../types/source';
import { createBaseAjv } from '../constructor/base-ajv';

export const validateSourceSchema =
  createBaseAjv().compile<SourceSchema>(sourceSchema);
