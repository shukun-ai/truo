import dataSourceSchema from '../../json-schemas/data-source.schema.json';
import { DataSourceSchema } from '../../types/data-source';
import { createBaseAjv } from '../constructor/base-ajv';

export const validateDataSourceSchema =
  createBaseAjv().compile<DataSourceSchema>(dataSourceSchema);
