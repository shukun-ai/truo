import { TypeException } from '@shukun/exception';
import Ajv from 'ajv';

import { SchemaValidator } from './schema-validator';

describe('SchemaValidator', () => {
  it('should throw error, when use validate before compile', () => {
    const ajv = new Ajv();
    const schemaValidator = new SchemaValidator(ajv);
    const input = {};
    expect(() => schemaValidator.validate(input)).toThrow(
      new TypeException('Did not compile the JSON Schema.'),
    );
  });

  it('should throw error, when use validate happen error', () => {
    const ajv = new Ajv();

    const schemaValidator = new SchemaValidator(ajv);
    const mockJsonSchema = {
      type: 'number',
    };
    const input = {};
    schemaValidator.compile(mockJsonSchema);
    expect(() => schemaValidator.validate(input)).toThrow(
      new TypeException(
        `Schema Validate Errors: [{"instancePath":"","schemaPath":"#/type","keyword":"type","params":{"type":"number"},"message":"must be number"}]`,
      ),
    );
  });
});
