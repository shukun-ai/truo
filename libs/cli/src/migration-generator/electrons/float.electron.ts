import { MetadataElectron } from '@shukun/schema';

import { ElectronFactoryInterface } from '../electron-factory';

export class FloatElectron implements ElectronFactoryInterface {
  DEFAULT_PRECISION = 8;
  DEFAULT_SCALE = 2;

  buildSqlSchema(electron: MetadataElectron): string {
    const precision = electron.precision ?? this.DEFAULT_PRECISION;
    const scale = electron.scale ?? this.DEFAULT_SCALE;

    return `.float('${electron.name}', ${precision}, ${scale})`;
  }
}
