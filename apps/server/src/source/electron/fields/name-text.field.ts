import { isEngineName, isStartedWithLowercase } from '@shukun/electron';
import { Schema } from 'mongoose';

import { ElectronValueException } from '../../../exceptions/electron-value-exception';

import {
  ElectronExceptions,
  ElectronType,
  MongooseSchema,
} from '../electron-field.interface';

export class NameTextField implements ElectronType {
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
