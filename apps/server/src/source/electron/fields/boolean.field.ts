import { Schema } from 'mongoose';

import { ElectronValueException } from '../../../exceptions/electron-value-exception';

import {
  ElectronExceptions,
  ElectronType,
  MongooseSchema,
} from '../electron-field.interface';

export class BooleanField implements ElectronType {
  validateValue(value: unknown): ElectronExceptions {
    const errorMessage = [];

    if (typeof value !== 'boolean') {
      errorMessage.push(
        new ElectronValueException('should be a boolean type.'),
      );
    }

    return errorMessage;
  }

  buildSchema(): MongooseSchema {
    return {
      type: Schema.Types.Boolean,
    };
  }
}
