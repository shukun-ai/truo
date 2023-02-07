import { MetadataElectronDateTime } from '@shukun/schema';

import { IElectronBuilder } from '../electron-builder.interface';

export class DateTimeElectron implements IElectronBuilder {
  constructor(private readonly electron: MetadataElectronDateTime) {}

  buildSqlSchema(): string {
    return `.timestamp('${this.electron.name}')`;
  }
}
