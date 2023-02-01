import { MetadataElectronCurrency } from '@shukun/schema';
import { CURRENCY_PRECISION, CURRENCY_SCALE } from '@shukun/validator';

import { IElectronBuilder } from '../electron-builder.interface';

export class CurrencyElectron implements IElectronBuilder {
  constructor(private readonly electron: MetadataElectronCurrency) {}

  buildSqlSchema(): string {
    const precision = CURRENCY_PRECISION;
    const scale = CURRENCY_SCALE;

    return `.float('${this.electron.name}', ${precision}, ${scale})`;
  }
}
