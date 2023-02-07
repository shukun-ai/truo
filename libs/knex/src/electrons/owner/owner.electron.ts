import { MetadataElectronOwner } from '@shukun/schema';
import { MANY_TO_ONE_MAX_LENGTH } from '@shukun/validator';

import { IElectronBuilder } from '../electron-builder.interface';

export class OwnerElectron implements IElectronBuilder {
  constructor(private readonly electron: MetadataElectronOwner) {}

  buildSqlSchema(): string {
    return `.string('${this.electron.name}', ${MANY_TO_ONE_MAX_LENGTH})`;
  }
}
