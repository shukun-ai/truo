import { ElectronValueException } from '@shukun/exception';
import { Schema } from 'mongoose';

import {
  ElectronExceptions,
  ElectronType,
  MongooseSchema,
} from '../electron-field.interface';

export class IsSystemField implements ElectronType {
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
