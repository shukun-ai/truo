import { isDateTimeIso } from '@shukun/electron';
import { Schema } from 'mongoose';

import { ElectronType, MongooseSchema } from '../electron-field.interface';

export class DateTimeField implements ElectronType {
  validateValue(value: unknown) {
    const errorMessage = [];

    if (value && !isDateTimeIso(value)) {
      errorMessage.push(
        'The date format should be ISO8601, try to use ".toISOString()."',
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
