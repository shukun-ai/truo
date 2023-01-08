import { Schema } from 'mongoose';

import { ElectronType, MongooseSchema } from '../electron-field.interface';

export class CurrencyField implements ElectronType {
  validateValue(value: unknown) {
    const messages = [];

    if (typeof value !== 'number') {
      messages.push('仅支持类型为 number 的 Currency 字段。');
    }

    return messages;
  }

  buildSchema(): MongooseSchema {
    return {
      type: Schema.Types.Number,
    };
  }
}
