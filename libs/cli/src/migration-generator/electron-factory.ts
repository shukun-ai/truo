import { MetadataElectron, MetadataFieldType } from '@shukun/schema';

import { AttachmentElectron } from './electrons/attachment.electron';
import { BooleanElectron } from './electrons/boolean.electron';
import { CurrencyElectron } from './electrons/currency.electron';
import { DateTimeElectron } from './electrons/date-time.electron';
import { FloatElectron } from './electrons/float.electron';
import { IntegerElectron } from './electrons/integer.electron';
import { LargeTextElectron } from './electrons/large-text.electron';
import { ManyToOneElectron } from './electrons/many-to-one.electron';
import { MixedElectron } from './electrons/mixed.electron';
import { NameTextElectron } from './electrons/name-text.electron';
import { OwnerElectron } from './electrons/owner.electron';
import { PasswordElectron } from './electrons/password.electron';
import { SingleSelectElectron } from './electrons/single-select.electron';

import { TextElectron } from './electrons/text.electron';

export interface ElectronFactoryInterface {
  sqlSchemaBuilder: (electron: MetadataElectron) => string;
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
      throw new Error('We did not support MultiSelect in SQL Data Source.');
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
      throw new Error('We did not support ManyToMany in SQL Data Source.');
    case MetadataFieldType.ManyToOne:
      return new ManyToOneElectron();
    case MetadataFieldType.Owner:
      return new OwnerElectron();
    case MetadataFieldType.Attachment:
      return new AttachmentElectron();
    case MetadataFieldType.Mixed:
      return new MixedElectron();
    case MetadataFieldType.Role:
      throw new Error('We did not support Role in SQL Data Source.');
  }
}
