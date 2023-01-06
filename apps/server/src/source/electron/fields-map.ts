import { MetadataFieldType } from '@shukun/schema';

import { ElectronType } from './electron-field.interface';
import { AttachmentField } from './fields/attachment.field';
import { BooleanField } from './fields/boolean.field';
import { CurrencyField } from './fields/currency.field';
import { DateTimeField } from './fields/date-time.field';
import { FloatField } from './fields/float.field';
import { IntegerField } from './fields/integer.field';
import { LargeTextField } from './fields/large-text.field';
import { ManyToManyField } from './fields/many-to-many.field';
import { ManyToOneField } from './fields/many-to-one.field';
import { MixedField } from './fields/mixed.field';
import { MultiSelectField } from './fields/multi-select.field';
import { NameTextField } from './fields/name-text.field';
import { OwnerField } from './fields/owner.field';
import { PasswordField } from './fields/password.field';
import { RoleField } from './fields/role.field';
import { SingleSelectField } from './fields/single-select.field';
import { TextField } from './fields/text.field';

export function getFieldInstance(fieldType: MetadataFieldType): ElectronType {
  switch (fieldType) {
    case MetadataFieldType.Text:
      return new TextField();
    case MetadataFieldType.NameText:
      return new NameTextField();
    case MetadataFieldType.LargeText:
      return new LargeTextField();
    case MetadataFieldType.SingleSelect:
      return new SingleSelectField();
    case MetadataFieldType.MultiSelect:
      return new MultiSelectField();
    case MetadataFieldType.Boolean:
      return new BooleanField();
    case MetadataFieldType.DateTime:
      return new DateTimeField();
    case MetadataFieldType.Integer:
      return new IntegerField();
    case MetadataFieldType.Float:
      return new FloatField();
    case MetadataFieldType.Currency:
      return new CurrencyField();
    case MetadataFieldType.Password:
      return new PasswordField();
    case MetadataFieldType.ManyToMany:
      return new ManyToManyField();
    case MetadataFieldType.ManyToOne:
      return new ManyToOneField();
    case MetadataFieldType.Owner:
      return new OwnerField();
    case MetadataFieldType.Attachment:
      return new AttachmentField();
    case MetadataFieldType.Mixed:
      return new MixedField();
    case MetadataFieldType.Role:
      return new RoleField();
  }
}
