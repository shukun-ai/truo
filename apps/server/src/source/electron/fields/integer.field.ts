import { DataSourceType } from '@shukun/schema';
import { Schema } from 'mongoose';

import { MongooseSchema } from '../electron-field.interface';
import { IElectronInterpreter } from '../electron-interpreter.interface';

export class IntegerField implements IElectronInterpreter {
  validateValue() {
    return [];
  }

  buildSchema(): MongooseSchema {
    return {
      type: Schema.Types.Number,
    };
  }

  afterQuery(value: unknown, connectionType: DataSourceType): unknown {
    if (typeof value === 'string' && connectionType === 'postgres') {
      return parseInt(value, 10);
    }
    return value;
  }
}
