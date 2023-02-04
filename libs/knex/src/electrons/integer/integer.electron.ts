import { MetadataElectronInteger } from '@shukun/schema';

import { IElectronBuilder } from '../electron-builder.interface';

export class IntegerElectron implements IElectronBuilder {
  constructor(private readonly electron: MetadataElectronInteger) {}

  buildSqlSchema(): string {
    return `.bigInteger('${this.electron.name}')`;
  }
}
