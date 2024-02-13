import { ElectronValueException } from '@shukun/exception';
import { MetadataElectronPassword } from '@shukun/schema';
import {
  PASSWORD_DEFAULT_MAX_LENGTH,
  PASSWORD_DEFAULT_MIN_LENGTH,
} from '@shukun/validator';
import { Schema } from 'mongoose';

import validator from 'validator';

import { cryptoPassword } from '../../../identity/utils/password.utils';

import {
  ElectronExceptions,
  MongooseSchema,
} from '../electron-field.interface';
import { IElectronInterpreter } from '../electron-interpreter.interface';

export class PasswordField implements IElectronInterpreter {
  constructor(private readonly electron: MetadataElectronPassword) {}

  validateValue(value: unknown): ElectronExceptions {
    const messages = [];
    const minLength =
      this.electron.passwordOptions?.minLength || PASSWORD_DEFAULT_MIN_LENGTH;
    const maxLength =
      this.electron.passwordOptions?.maxLength || PASSWORD_DEFAULT_MAX_LENGTH;

    if (
      typeof value === 'string' &&
      !validator.isLength(value, { min: minLength, max: maxLength })
    ) {
      messages.push(
        new ElectronValueException(
          'should be less than {{minLength}} and greater than {{maxLength}}',
          {
            minLength,
            maxLength,
          },
        ),
      );
    }

    return messages;
  }

  buildSchema(): MongooseSchema {
    // TODO remove MongooseSchema, use afterQuery to implement it.
    return {
      type: Schema.Types.String,
      transform: () => '',
    };
  }

  beforeSave(value: unknown) {
    if (value && typeof value === 'string') {
      return cryptoPassword(value);
    }

    return value;
  }

  afterQuery() {
    return null;
  }
}
