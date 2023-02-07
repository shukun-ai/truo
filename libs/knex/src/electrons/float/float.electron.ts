import { MetadataElectronFloat } from '@shukun/schema';

import { IElectronBuilder } from '../electron-builder.interface';

export class FloatElectron implements IElectronBuilder {
  constructor(private readonly electron: MetadataElectronFloat) {}

  buildSqlSchema(): string {
    return `.decimal('${this.electron.name}', null, null)`;
  }
}
