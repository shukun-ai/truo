import { Schema } from 'mongoose';

import { ElectronType, SchemaBuilderResult } from '../electron-field.interface';

export class IsSystemField implements ElectronType {
  validateValue(value: unknown) {
    const errorMessage = [];

    if (typeof value !== 'boolean') {
      errorMessage.push('should be a boolean.');
    }

    return errorMessage;
  }

  buildSchema(): SchemaBuilderResult {
    return {
      type: Schema.Types.Boolean,
    };
  }
}
