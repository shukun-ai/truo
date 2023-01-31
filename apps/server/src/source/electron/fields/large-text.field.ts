import { MetadataElectron } from '@shukun/schema';
import { Schema } from 'mongoose';

import {
  ElectronExceptions,
  MongooseSchema,
} from '../electron-field.interface';
import { IElectronInterpreter } from '../electron-interpreter.interface';

export class LargeTextField implements IElectronInterpreter {
  constructor(private readonly electron: MetadataElectron) {}

  validateValue(): ElectronExceptions {
    return [];
  }

  buildSchema(): MongooseSchema {
    return {
      type: Schema.Types.String,
    };
  }
}
