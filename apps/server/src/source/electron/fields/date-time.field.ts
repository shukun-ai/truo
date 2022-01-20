import * as dayjs from 'dayjs';
import { Schema } from 'mongoose';

import { ElectronType, SchemaBuilderResult } from '../electron-field.interface';

export class DateTimeField implements ElectronType {
  validateValue(value: unknown) {
    const errorMessage = [];

    if (typeof value === 'string' && !dayjs(value).isValid()) {
      errorMessage.push('should be a correct data, e.g. YYYY-MM-DD HH:mm:ss.');
    }

    return errorMessage;
  }

  buildSchema(): SchemaBuilderResult {
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
