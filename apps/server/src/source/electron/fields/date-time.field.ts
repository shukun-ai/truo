import { ElectronValueException } from '@shukun/exception';
import { isDateTimeIso } from '@shukun/validator';
import { Schema } from 'mongoose';

import {
  ElectronExceptions,
  MongooseSchema,
} from '../electron-field.interface';
import { IElectronInterpreter } from '../electron-interpreter.interface';

export class DateTimeField implements IElectronInterpreter {
  validateValue(value: unknown): ElectronExceptions {
    const errorMessage = [];

    if (value && !isDateTimeIso(value)) {
      errorMessage.push(
        new ElectronValueException(
          'should be ISO8601 date, try to use "date.toISOString()."',
        ),
      );
    }

    return errorMessage;
  }

  buildSchema(): MongooseSchema {
    // TODO remove MongooseSchema, use afterQuery to implement it.
    return {
      type: Schema.Types.Date,
      transform: (value) => {
        if (!value) {
          return value;
        }
        if (value instanceof Date) {
          return value.toISOString();
        } else {
          console.error('value value is not valid Date.');
          return undefined;
        }
      },
    };
  }
}
