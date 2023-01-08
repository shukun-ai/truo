import { isEngineName, isStartedWithLowercase } from '@shukun/electron';
import { MetadataElectron } from '@shukun/schema';
import { Schema } from 'mongoose';

import { ElectronType, MongooseSchema } from '../electron-field.interface';

export class NameTextField implements ElectronType {
  validateValue(value: unknown, electron: MetadataElectron): string[] {
    const errorMessage = [];

    if (!isEngineName(value)) {
      errorMessage.push(`${electron.name} 字段仅允许 a-z, 0-9 或 _ 字符。`);
    }

    if (!isStartedWithLowercase(value)) {
      errorMessage.push(`${electron.name} 字段仅允许以 a-z 作为第一个字符。`);
    }

    return errorMessage;
  }

  buildSchema(): MongooseSchema {
    return {
      type: Schema.Types.String,
    };
  }
}
