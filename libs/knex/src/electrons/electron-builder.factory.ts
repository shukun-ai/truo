import { MetadataElectron } from '@shukun/schema';

import { AttachmentElectron } from './attachment/attachment.electron';
import { BooleanElectron } from './boolean/boolean.electron';
import { CurrencyElectron } from './currency/currency.electron';
import { DateTimeElectron } from './date-time/date-time.electron';
import { IElectronBuilder } from './electron-builder.interface';
import { FloatElectron } from './float/float.electron';
import { IntegerElectron } from './integer/integer.electron';
import { LargeTextElectron } from './large-text/large-text.electron';
import { ManyToManyElectron } from './many-to-many/many-to-many.electron';
import { ManyToOneElectron } from './many-to-one/many-to-one.electron';
import { MixedElectron } from './mixed/mixed.electron';
import { MultiSelectElectron } from './multi-select/multi-select.electron';
import { NameTextElectron } from './name-text/name-text.electron';
import { OwnerElectron } from './owner/owner.electron';
import { PasswordElectron } from './password/password.electron';
import { RoleElectron } from './role/role.electron';
import { SingleSelectElectron } from './single-select/single-select.electron';
import { TextElectron } from './text/text.electron';

export class ElectronBuilderFactory {
  static create(electron: MetadataElectron): IElectronBuilder {
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
}
