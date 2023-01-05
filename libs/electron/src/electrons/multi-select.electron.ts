import { MetadataElectron } from '@shukun/schema';
import { Schema } from 'mongoose';

import { ElectronFactoryInterface, MongooseSchema } from '../electron-factory';

export class MultiSelectElectron implements ElectronFactoryInterface {
  buildSqlSchema(electron: MetadataElectron): string {
    throw new Error('Did not support MultiSelect type in SQL Schema.');
  }

  buildMongooseSchema(electron: MetadataElectron): MongooseSchema {
    return {
      type: [Schema.Types.String],
      enum: (electron.options || []).map((option) => option.key),
    };
  }

  validateElectron(electron: MetadataElectron): void {
    return;
  }

  validateValue(): string[] {
    return [];
  }
}
