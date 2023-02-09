import { MetadataElectronCurrency } from '@shukun/schema';

import { IElectronBuilder } from '../electron-builder.interface';

export class CurrencyElectron implements IElectronBuilder {
  constructor(private readonly electron: MetadataElectronCurrency) {}

  buildSqlSchema(): string {
    return `.decimal('${this.electron.name}', null, null)`;
  }
}
