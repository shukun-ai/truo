import { MetadataElectron } from '@shukun/schema';

import { ElectronFactoryInterface } from '../electron-factory';

export class CurrencyElectron implements ElectronFactoryInterface {
  DEFAULT_PRECISION = 15;
  DEFAULT_SCALE = 4;

  buildSqlSchema(electron: MetadataElectron): string {
    const precision = this.DEFAULT_PRECISION;
    const scale = this.DEFAULT_SCALE;

    return `.float('${electron.name}', ${precision}, ${scale})`;
  }
}
