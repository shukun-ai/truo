import { DataSourceType, MetadataElectron } from '@shukun/schema';
import { Connection } from 'mongoose';

export interface ElectronType {
  validateValue: (value: unknown, electron: MetadataElectron) => string[];
  /**
   * Only for mongoose, and will be deprecated.
   */
  buildSchema: (
    electron: MetadataElectron,
    connection: Connection,
  ) => SchemaBuilderResult;
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

export interface SchemaBuilderResult {
  type: any;
  ref?: string;
  enum?: any[];
  // @see https://mongoosejs.com/docs/api/schematype.html#schematype_SchemaType-transform
  transform?: (value: unknown) => unknown;
}

export interface SchemaCommonResult {
  index: boolean;
  required: boolean;
  unique: boolean;
}
