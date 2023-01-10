import { ElectronValueException } from '@shukun/exception';
import { DataSourceType, MetadataElectron } from '@shukun/schema';
import { Connection } from 'mongoose';

export interface ElectronType {
  validateValue: (
    value: unknown,
    electron: MetadataElectron,
  ) => ElectronExceptions;
  // TODO Only for mongoose, and will be deprecated when remove mongoose.
  buildSchema: (
    electron: MetadataElectron,
    connection: Connection,
  ) => MongooseSchema;
  beforeSave?: (
    value: unknown,
    electron: MetadataElectron,
    connectionType: DataSourceType,
  ) => unknown;
  afterQuery?: (
    value: unknown,
    electron: MetadataElectron,
    connectionType: DataSourceType,
  ) => unknown;
}

export interface MongooseSchema {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type: any;
  ref?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  enum?: any[];
  // @see https://mongoosejs.com/docs/api/schematype.html#schematype_SchemaType-transform
  transform?: (value: unknown) => unknown;
}

export interface MongooseConstraintSchema {
  index: boolean;
  required: boolean;
  unique: boolean;
}

export type ElectronExceptions = ElectronValueException[];
