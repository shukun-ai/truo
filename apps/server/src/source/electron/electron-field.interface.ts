import { ElectronValueException } from '@shukun/exception';

export type MongooseSchema = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type: any;
  ref?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  enum?: any[];
  // @see https://mongoosejs.com/docs/api/schematype.html#schematype_SchemaType-transform
  transform?: (value: unknown) => unknown;
};

export type MongooseConstraintSchema = {
  index: boolean;
  required: boolean;
  unique: boolean;
};

export type ElectronExceptions = ElectronValueException[];
