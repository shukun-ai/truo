import { MetadataElectron } from '@shukun/schema';
import { Schema } from 'mongoose';

import { ElectronType, MongooseSchema } from '../electron-field.interface';

export class IsSystemField implements ElectronType {
  validateValue(value: unknown, electron: MetadataElectron) {
    const errorMessage = [];

    if (typeof value !== 'boolean') {
      errorMessage.push(`${electron} 应该为一个 boolean 类型.`);
    }

    return errorMessage;
  }

  buildSchema(): MongooseSchema {
    return {
      type: Schema.Types.Boolean,
    };
  }
}
