import { BadRequestException } from '@nestjs/common';
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

const fieldsMap: { [keyName in MetadataFieldType]: any } = {
  Text: TextField,
  NameText: NameTextField,
  LargeText: LargeTextField,
  SingleSelect: SingleSelectField,
  MultiSelect: MultiSelectField,
  Boolean: BooleanField,
  DateTime: DateTimeField,
  Integer: IntegerField,
  Float: FloatField,
  Currency: CurrencyField,
  Password: PasswordField,
  ManyToMany: ManyToManyField,
  ManyToOne: ManyToOneField,
  Owner: OwnerField,
  Attachment: AttachmentField,
  Mixed: MixedField,
  Role: RoleField,
};

export function getFieldInstance(
  fieldType: MetadataFieldType | string,
): ElectronType {
  if (!Object.keys(fieldsMap).includes(fieldType)) {
    throw new Error(`We do not support ${fieldType} field type.`);
  }

  const Type = fieldsMap[fieldType as MetadataFieldType];

  if (!Type) {
    throw new BadRequestException(`We do not support ${fieldType} field type.`);
  }
  return new Type() as ElectronType;
}
