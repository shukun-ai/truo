import { Schema } from 'mongoose';

import { ElectronType, MongooseSchema } from '../electron-field.interface';

export class BooleanField implements ElectronType {
  validateValue(value: unknown) {
    const errorMessage = [];

    if (typeof value !== 'boolean') {
      errorMessage.push('should be a boolean.');
    }

    return errorMessage;
  }

  buildSchema(): MongooseSchema {
    return {
      type: Schema.Types.Boolean,
    };
  }
}
