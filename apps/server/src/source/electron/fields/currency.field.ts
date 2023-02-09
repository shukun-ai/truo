import { ElectronValueException } from '@shukun/exception';
import { DataSourceType } from '@shukun/schema';
import { CURRENCY_MAX_SCALE, isMaxScale } from '@shukun/validator';
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
      messages.push(new ElectronValueException('should be a number'));
    }

    if (isMaxScale(value, CURRENCY_MAX_SCALE)) {
      messages.push(
        new ElectronValueException(
          'the length after dot should be less than {{scale}}',
          {
            scale: CURRENCY_MAX_SCALE,
          },
        ),
      );
    }

    return messages;
  }

  buildSchema(): MongooseSchema {
    return {
      type: Schema.Types.Number,
    };
  }

  afterQuery(value: unknown, connectionType: DataSourceType): unknown {
    if (typeof value === 'string' && connectionType === 'postgres') {
      return parseFloat(value);
    }
    return value;
  }
}
