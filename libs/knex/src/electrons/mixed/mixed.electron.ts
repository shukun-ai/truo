import { MetadataElectronMixed } from '@shukun/schema';

import { IElectronBuilder } from '../electron-builder.interface';

export class MixedElectron implements IElectronBuilder {
  constructor(private readonly electron: MetadataElectronMixed) {}

  buildSqlSchema(): string {
    return `.json('${this.electron.name}')`;
  }
}
