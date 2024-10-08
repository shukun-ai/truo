import { ElectronValueException } from '@shukun/exception';
import { Schema } from 'mongoose';

import {
  ElectronExceptions,
  MongooseSchema,
} from '../electron-field.interface';
import { IElectronInterpreter } from '../electron-interpreter.interface';

export class IsSystemField implements IElectronInterpreter {
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
