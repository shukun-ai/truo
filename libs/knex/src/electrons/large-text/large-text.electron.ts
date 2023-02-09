import { MetadataElectronLargeText } from '@shukun/schema';

import { IElectronBuilder } from '../electron-builder.interface';

export class LargeTextElectron implements IElectronBuilder {
  constructor(private readonly electron: MetadataElectronLargeText) {}

  buildSqlSchema(): string {
    return `.text('${this.electron.name}')`;
  }
}
