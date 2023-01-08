import { isMaxLength, TEXT_MAX_LENGTH } from '@shukun/electron';
import { MetadataElectron } from '@shukun/schema';
import { Schema } from 'mongoose';

import { ElectronType, MongooseSchema } from '../electron-field.interface';

export class TextField implements ElectronType {
  validateValue(value: unknown, electron: MetadataElectron): string[] {
    const errorMessages = [];

    if (isMaxLength(value, TEXT_MAX_LENGTH)) {
      errorMessages.push(
        `${electron.name} 字段输入值应小于 ${TEXT_MAX_LENGTH} 位。`,
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
