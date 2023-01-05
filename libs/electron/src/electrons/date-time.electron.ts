import { MetadataElectron } from '@shukun/schema';
import dayjs from 'dayjs';
import { Schema } from 'mongoose';

import { ElectronFactoryInterface, MongooseSchema } from '../electron-factory';

export class DateTimeElectron implements ElectronFactoryInterface {
  buildSqlSchema(electron: MetadataElectron): string {
    return `table.timestamp('${electron.name}');`;
  }

  buildMongooseSchema(): MongooseSchema {
    return {
      type: Schema.Types.Date,
      transform: (value): unknown => {
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

  validateElectron(electron: MetadataElectron): void {
    return;
  }

  validateValue(value: unknown): string[] {
    const errorMessages = [];

    // TODO use date-fns instead of dayjs
    if (typeof value === 'string' && !dayjs(value).isValid()) {
      errorMessages.push('should be a correct data, e.g. YYYY-MM-DD HH:mm:ss.');
    }

    return errorMessages;
  }
}
