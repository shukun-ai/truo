import { DataSourceType, MetadataElectron } from '@shukun/schema';
import { Schema } from 'mongoose';

import { ElectronType, MongooseSchema } from '../electron-field.interface';

export class MixedField implements ElectronType {
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
  beforeSave(
    value: unknown,
    electron: MetadataElectron,
    connectionType: DataSourceType,
  ): unknown {
    if (connectionType === 'postgres') {
      return JSON.stringify(value);
    } else {
      return value;
    }
  }
}
