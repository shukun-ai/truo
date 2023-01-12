import { TypeException } from '@shukun/exception';
import Ajv, { Schema } from 'ajv';
import { ValidateFunction } from 'ajv/dist/core';

import { SchemaValidatorInterface } from './schema-validator.interface';

export class SchemaValidator implements SchemaValidatorInterface {
  private validateFunction?: ValidateFunction;

  constructor(private readonly ajv: Ajv) {}

  compile(jsonSchema: unknown): this {
    this.validateFunction = this.ajv.compile(jsonSchema as Schema);
    return this;
  }

  validate(input: unknown): this {
    const validateFunction = this.getValidateFunction();
    const result = validateFunction(input);

    if (result === false) {
      // TODO add a new SchemaValidateError
      throw new TypeError(
        'Schema Validate Errors: ' + JSON.stringify(validateFunction.errors),
      );
    }

    return this;
  }

  private getValidateFunction(): ValidateFunction {
    if (!this.validateFunction) {
      throw new TypeException('Did not compile the JSON Schema.');
    }
    return this.validateFunction;
  }
}

// export function createSchemaValidate(validateFunction: ValidateFunction) {
//   return (input: unknown): void => {
//     const result = validateFunction(input);

//     if (result === false) {
//       // TODO add a new SchemaValidateError
//       throw new TypeError(
//         'Schema Validate Errors: ' + JSON.stringify(validateFunction.errors),
//       );
//     }
//   };
// }
