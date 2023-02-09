import { createBaseAjv } from '../schema-validator/internal/base-ajv';
import { SchemaValidator } from '../schema-validator/schema-validator';

export const commonSchemaValidator = new SchemaValidator(createBaseAjv());
