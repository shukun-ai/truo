import { MetadataElectronSingleSelect } from '@shukun/schema';
import { Schema } from 'mongoose';

import { MongooseSchema } from '../electron-field.interface';

import { IElectronInterpreter } from '../electron-interpreter.interface';

export class SingleSelectField implements IElectronInterpreter {
  constructor(private readonly electron: MetadataElectronSingleSelect) {}

  validateValue() {
    return [];
  }

  buildSchema(): MongooseSchema {
    return {
      type: Schema.Types.String,
      enum: (this.electron.options || []).map((option) => option.key),
    };
  }
}
