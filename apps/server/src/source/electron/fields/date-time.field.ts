import { isDateTimeIso } from '@shukun/electron';
import { Schema } from 'mongoose';

import { ElectronValueException } from '../../../exceptions/electron-value-exception';

import {
  ElectronExceptions,
  ElectronType,
  MongooseSchema,
} from '../electron-field.interface';

export class DateTimeField implements ElectronType {
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
        }
      },
    };
  }
}
