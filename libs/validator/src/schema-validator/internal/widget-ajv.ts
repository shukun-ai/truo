import { referenceDataSchema, widgetSchema } from '@shukun/schema';
import { Options } from 'ajv';

import { createBaseAjv } from './base-ajv';

export function createWidgetAjv(options?: Options) {
  const validate = createBaseAjv(options)
    .addSchema(widgetSchema, 'widget.schema.json')
    .addSchema(referenceDataSchema, 'reference/reference-data.schema.json');

  return validate;
}
