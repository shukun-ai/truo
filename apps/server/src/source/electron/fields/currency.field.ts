import { ElectronValueException } from '@shukun/exception';
import { Schema } from 'mongoose';

import {
  ElectronExceptions,
  MongooseSchema,
} from '../electron-field.interface';
import { IElectronInterpreter } from '../electron-interpreter.interface';

export class CurrencyField implements IElectronInterpreter {
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
