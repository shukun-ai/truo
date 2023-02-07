import { MetadataElectronPassword } from '@shukun/schema';
import { PASSWORD_MAX_LENGTH } from '@shukun/validator';

import { IElectronBuilder } from '../electron-builder.interface';

export class PasswordElectron implements IElectronBuilder {
  constructor(private readonly electron: MetadataElectronPassword) {}

  buildSqlSchema(): string {
    return `.string('${this.electron.name}', ${PASSWORD_MAX_LENGTH})`;
  }
}
