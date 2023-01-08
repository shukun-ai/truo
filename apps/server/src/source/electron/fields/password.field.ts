import {
  PASSWORD_DEFAULT_MAX_LENGTH,
  PASSWORD_DEFAULT_MIN_LENGTH,
} from '@shukun/electron';
import { MetadataElectron } from '@shukun/schema';
import { Schema } from 'mongoose';

import validator from 'validator';

import { cryptoPassword } from '../../../identity/utils/password.utils';

import { ElectronType, MongooseSchema } from '../electron-field.interface';

export class PasswordField implements ElectronType {
  validateValue(value: unknown, electron: MetadataElectron) {
    const messages = [];
    const minLength =
      electron.passwordOptions?.minLength || PASSWORD_DEFAULT_MIN_LENGTH;
    const maxLength =
      electron.passwordOptions?.maxLength || PASSWORD_DEFAULT_MAX_LENGTH;

    if (!value || typeof value !== 'string') {
      messages.push('密码输入值应为非空字符串。');
    } else if (!validator.isLength(value, { min: minLength, max: maxLength })) {
      messages.push(`密码输入值应大于 ${minLength} 位，小于 ${maxLength} 位。`);
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
