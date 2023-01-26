import { DataSourceType } from '@shukun/schema';
import { Connection } from 'mongoose';

import { ElectronExceptions, MongooseSchema } from './electron-field.interface';

export interface IElectronInterpreter {
  validateValue: (value: unknown) => ElectronExceptions;
  // TODO Only for mongoose, and will be deprecated when remove mongoose.
  buildSchema: (connection: Connection) => MongooseSchema;
  beforeSave?: (value: unknown, connectionType: DataSourceType) => unknown;
  afterQuery?: (value: unknown, connectionType: DataSourceType) => unknown;
}
