import { ElectronValueException } from '@shukun/exception';
import { MetadataElectron } from '@shukun/schema';
import {
  PASSWORD_DEFAULT_MAX_LENGTH,
  PASSWORD_DEFAULT_MIN_LENGTH,
} from '@shukun/validator';
import { Schema } from 'mongoose';

import validator from 'validator';

import { cryptoPassword } from '../../../identity/utils/password.utils';

import {
  ElectronExceptions,
  ElectronType,
  MongooseSchema,
} from '../electron-field.interface';

export class PasswordField implements ElectronType {
  validateValue(
    value: unknown,
    electron: MetadataElectron,
  ): ElectronExceptions {
    const messages = [];
    const minLength =
      electron.passwordOptions?.minLength || PASSWORD_DEFAULT_MIN_LENGTH;
    const maxLength =
      electron.passwordOptions?.maxLength || PASSWORD_DEFAULT_MAX_LENGTH;

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
      transform: () => null,
    };
  }

  beforeSave(value: unknown) {
    if (value && typeof value === 'string') {
      return cryptoPassword(value);
    }

    return value;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterQuery(value: unknown, electron: MetadataElectron) {
    return null;
  }
}
