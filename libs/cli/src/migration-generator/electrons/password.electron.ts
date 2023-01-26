import { MetadataElectronPassword } from '@shukun/schema';
import { PASSWORD_MAX_LENGTH } from '@shukun/validator';

import { ElectronFactoryInterface } from '../electron-factory';

export class PasswordElectron implements ElectronFactoryInterface {
  constructor(private readonly electron: MetadataElectronPassword) {}

  buildSqlSchema(): string {
    return `.string('${this.electron.name}', ${PASSWORD_MAX_LENGTH})`;
  }
}
