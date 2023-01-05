import { MetadataElectron, MetadataFieldType } from '@shukun/schema';
import { Connection } from 'mongoose';

import { AttachmentElectron } from './electrons/attachment.electron';
import { BooleanElectron } from './electrons/boolean.electron';
import { CurrencyElectron } from './electrons/currency.electron';
import { DateTimeElectron } from './electrons/date-time.electron';
import { FloatElectron } from './electrons/float.electron';
import { IntegerElectron } from './electrons/integer.electron';
import { LargeTextElectron } from './electrons/large-text.electron';
import { ManyToManyElectron } from './electrons/many-to-many.electron';
import { ManyToOneElectron } from './electrons/many-to-one.electron';
import { MixedElectron } from './electrons/mixed.electron';
import { MultiSelectElectron } from './electrons/multi-select.electron';
import { NameTextElectron } from './electrons/name-text.electron';
import { OwnerElectron } from './electrons/owner.electron';
import { PasswordElectron } from './electrons/password.electron';
import { RoleElectron } from './electrons/role.electron';
import { SingleSelectElectron } from './electrons/single-select.electron';

import { TextElectron } from './electrons/text.electron';

export interface ElectronFactoryInterface {
  buildSqlSchema: (electron: MetadataElectron) => string;
  buildMongooseSchema: (
    electron: MetadataElectron,
    connection: Connection,
  ) => MongooseSchema;
  validateElectron: (electron: MetadataElectron) => void;
  validateValue: (value: unknown, electron: MetadataElectron) => string[];
  beforeSave?: (value: unknown, electron: MetadataElectron) => unknown;
  afterQuery?: (value: unknown, electron: MetadataElectron) => unknown;
}

/**
 * @deprecated Plan to remove Mongoose.
 */
export interface MongooseSchema {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type: any;
  ref?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  enum?: any[];
  // @see https://mongoosejs.com/docs/api/schematype.html#schematype_SchemaType-transform
  transform?: (value: unknown) => unknown;
}

export function getFieldInstance(
  fieldType: MetadataFieldType,
): ElectronFactoryInterface {
  switch (fieldType) {
    case MetadataFieldType.Text:
      return new TextElectron();
    case MetadataFieldType.NameText:
      return new NameTextElectron();
    case MetadataFieldType.LargeText:
      return new LargeTextElectron();
    case MetadataFieldType.SingleSelect:
      return new SingleSelectElectron();
    case MetadataFieldType.MultiSelect:
      return new MultiSelectElectron();
    case MetadataFieldType.Boolean:
      return new BooleanElectron();
    case MetadataFieldType.DateTime:
      return new DateTimeElectron();
    case MetadataFieldType.Integer:
      return new IntegerElectron();
    case MetadataFieldType.Float:
      return new FloatElectron();
    case MetadataFieldType.Currency:
      return new CurrencyElectron();
    case MetadataFieldType.Password:
      return new PasswordElectron();
    case MetadataFieldType.ManyToMany:
      return new ManyToManyElectron();
    case MetadataFieldType.ManyToOne:
      return new ManyToOneElectron();
    case MetadataFieldType.Owner:
      return new OwnerElectron();
    case MetadataFieldType.Attachment:
      return new AttachmentElectron();
    case MetadataFieldType.Mixed:
      return new MixedElectron();
    case MetadataFieldType.Role:
      return new RoleElectron();
  }
}
