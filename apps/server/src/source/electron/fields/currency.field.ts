import { Schema } from 'mongoose';

import { ElectronValueException } from '../../../exceptions/electron-value-exception';

import {
  ElectronExceptions,
  ElectronType,
  MongooseSchema,
} from '../electron-field.interface';

export class CurrencyField implements ElectronType {
  validateValue(value: unknown): ElectronExceptions {
    const messages = [];

    if (typeof value !== 'number') {
      messages.push(new ElectronValueException('should be number type.'));
    }

    return messages;
  }

  buildSchema(): MongooseSchema {
    return {
      type: Schema.Types.Number,
    };
  }
}
