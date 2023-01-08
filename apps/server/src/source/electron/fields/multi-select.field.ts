import { MetadataElectron } from '@shukun/schema';
import { Schema } from 'mongoose';

import { ElectronType, MongooseSchema } from '../electron-field.interface';

export class MultiSelectField implements ElectronType {
  validateValue() {
    return [];
  }

  buildSchema(electron: MetadataElectron): MongooseSchema {
    return {
      type: [Schema.Types.String],
      enum: (electron.options || []).map((option) => option.key),
    };
  }
}
