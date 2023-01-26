import { MetadataElectron } from '@shukun/schema';

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
  buildSqlSchema: () => string;
}

export function getFieldInstance(
  electron: MetadataElectron,
): ElectronFactoryInterface {
  switch (electron.fieldType) {
    case 'Text':
      return new TextElectron(electron);
    case 'NameText':
      return new NameTextElectron(electron);
    case 'LargeText':
      return new LargeTextElectron(electron);
    case 'SingleSelect':
      return new SingleSelectElectron(electron);
    case 'MultiSelect':
      return new MultiSelectElectron();
    case 'Boolean':
      return new BooleanElectron(electron);
    case 'DateTime':
      return new DateTimeElectron(electron);
    case 'Integer':
      return new IntegerElectron(electron);
    case 'Float':
      return new FloatElectron(electron);
    case 'Currency':
      return new CurrencyElectron(electron);
    case 'Password':
      return new PasswordElectron(electron);
    case 'ManyToMany':
      return new ManyToManyElectron();
    case 'ManyToOne':
      return new ManyToOneElectron(electron);
    case 'Owner':
      return new OwnerElectron(electron);
    case 'Attachment':
      return new AttachmentElectron(electron);
    case 'Mixed':
      return new MixedElectron(electron);
    case 'Role':
      return new RoleElectron();
  }
}
