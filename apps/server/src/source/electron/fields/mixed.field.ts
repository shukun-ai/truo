import { DataSourceType } from '@shukun/schema';
import { Schema } from 'mongoose';

import { MongooseSchema } from '../electron-field.interface';
import { IElectronInterpreter } from '../electron-interpreter.interface';

export class MixedField implements IElectronInterpreter {
  validateValue() {
    return [];
  }

  buildSchema(): MongooseSchema {
    return {
      type: Schema.Types.Mixed,
    };
  }

  // @see {@link https://knexjs.org/guide/schema-builder.html#json}
  // JSON.stringify(mightBeAnArray)
  beforeSave(value: unknown, connectionType: DataSourceType): unknown {
    if (connectionType === 'postgres') {
      return JSON.stringify(value);
    } else {
      return value;
    }
  }
}
