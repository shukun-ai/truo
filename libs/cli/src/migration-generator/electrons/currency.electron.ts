import { CURRENCY_PRECISION, CURRENCY_SCALE } from '@shukun/electron';
import { MetadataElectron } from '@shukun/schema';

import { ElectronFactoryInterface } from '../electron-factory';

export class CurrencyElectron implements ElectronFactoryInterface {
  buildSqlSchema(electron: MetadataElectron): string {
    const precision = CURRENCY_PRECISION;
    const scale = CURRENCY_SCALE;

    return `.float('${electron.name}', ${precision}, ${scale})`;
  }
}
