import { MetadataElectron } from '@shukun/schema';

import { IElectronInterpreter } from './electron-interpreter.interface';
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

export function getFieldInstance(
  electron: MetadataElectron,
): IElectronInterpreter {
  switch (electron.fieldType) {
    case 'Text':
      return new TextField(electron);
    case 'NameText':
      return new NameTextField();
    case 'LargeText':
      return new LargeTextField(electron);
    case 'SingleSelect':
      return new SingleSelectField(electron);
    case 'MultiSelect':
      return new MultiSelectField(electron);
    case 'Boolean':
      return new BooleanField();
    case 'DateTime':
      return new DateTimeField();
    case 'Integer':
      return new IntegerField();
    case 'Float':
      return new FloatField();
    case 'Currency':
      return new CurrencyField();
    case 'Password':
      return new PasswordField(electron);
    case 'ManyToMany':
      return new ManyToManyField();
    case 'ManyToOne':
      return new ManyToOneField();
    case 'Owner':
      return new OwnerField();
    case 'Attachment':
      return new AttachmentField();
    case 'Mixed':
      return new MixedField();
    case 'Role':
      return new RoleField();
  }
}
