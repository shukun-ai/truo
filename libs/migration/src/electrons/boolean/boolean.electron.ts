import { MetadataElectronBoolean } from '@shukun/schema';

import { IElectronBuilder } from '../electron-builder.interface';

export class BooleanElectron implements IElectronBuilder {
  constructor(private readonly electron: MetadataElectronBoolean) {}

  buildSqlSchema(): string {
    return `.boolean('${this.electron.name}')`;
  }
}
