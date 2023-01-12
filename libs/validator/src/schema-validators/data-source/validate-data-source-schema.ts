import { DataSourceSchema, dataSourceSchema } from '@shukun/schema';

import { createBaseAjv } from '../../base-schema-validator/base-ajv';

export const validateDataSourceSchema =
  createBaseAjv().compile<DataSourceSchema>(dataSourceSchema);
