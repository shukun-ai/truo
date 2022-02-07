import { MetadataElectron } from '@shukun/schema';
import { Schema } from 'mongoose';

import validator from 'validator';

import { cryptoPassword } from '../../../identity/utils/password.utils';

import { ElectronType, SchemaBuilderResult } from '../electron-field.interface';

const DEFAULT_MIN_LENGTH = 6;
const DEFAULT_MAX_LENGTH = 99;

export class PasswordField implements ElectronType {
  validateValue(value: unknown, electron: MetadataElectron) {
    const messages = [];
    const minLength = electron.minLength || DEFAULT_MIN_LENGTH;
    const maxLength = electron.maxLength || DEFAULT_MAX_LENGTH;

    if (!value || typeof value !== 'string') {
      messages.push('密码输入值应为非空字符串。');
    } else if (!validator.isLength(value, { min: minLength, max: maxLength })) {
      messages.push(`密码输入值应大于 ${minLength} 位，小于 ${maxLength} 位。`);
    }

    return messages;
  }

  buildSchema(): SchemaBuilderResult {
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
}
