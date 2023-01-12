import { ElectronValueException } from '@shukun/exception';
import { isMaxLength, TEXT_MAX_LENGTH } from '@shukun/validator';
import { Schema } from 'mongoose';

import {
  ElectronExceptions,
  ElectronType,
  MongooseSchema,
} from '../electron-field.interface';

export class TextField implements ElectronType {
  validateValue(value: unknown): ElectronExceptions {
    const errorMessages: ElectronExceptions = [];

    if (isMaxLength(value, TEXT_MAX_LENGTH)) {
      errorMessages.push(
        new ElectronValueException(`should be less than {{maxLength}}.`, {
          maxLength: TEXT_MAX_LENGTH,
        }),
      );
    }

    return errorMessages;
  }

  buildSchema(): MongooseSchema {
    return {
      type: Schema.Types.String,
    };
  }
}
