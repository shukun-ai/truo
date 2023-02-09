import { ElectronValueException } from '@shukun/exception';
import { isEngineName, isStartedWithLowercase } from '@shukun/validator';
import { Schema } from 'mongoose';

import {
  ElectronExceptions,
  MongooseSchema,
} from '../electron-field.interface';
import { IElectronInterpreter } from '../electron-interpreter.interface';

export class NameTextField implements IElectronInterpreter {
  validateValue(value: unknown): ElectronExceptions {
    const errorMessage = [];

    if (!isEngineName(value)) {
      errorMessage.push(
        new ElectronValueException('should be a-z, 0-9 or _ .'),
      );
    }

    if (!isStartedWithLowercase(value)) {
      errorMessage.push(new ElectronValueException('should start with a-z.'));
    }

    return errorMessage;
  }

  buildSchema(): MongooseSchema {
    return {
      type: Schema.Types.String,
    };
  }
}
