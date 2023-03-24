import { widgetSchema } from '@shukun/schema';

import { createWidgetAjv } from '../../schema-validator/internal/widget-ajv';
import { SchemaValidator } from '../../schema-validator/schema-validator';

export const widgetSchemaValidator = new SchemaValidator(
  createWidgetAjv(),
).compile(widgetSchema);
