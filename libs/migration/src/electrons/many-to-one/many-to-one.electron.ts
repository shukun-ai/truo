import { MetadataElectronManyToOne } from '@shukun/schema';
import { MANY_TO_ONE_MAX_LENGTH } from '@shukun/validator';

import { IElectronBuilder } from '../electron-builder.interface';

export class ManyToOneElectron implements IElectronBuilder {
  constructor(private readonly electron: MetadataElectronManyToOne) {}

  buildSqlSchema(): string {
    return `.string('${this.electron.name}', ${MANY_TO_ONE_MAX_LENGTH})`;
  }
}
