import { FLOAT_DEFAULT_PRECISION, FLOAT_DEFAULT_SCALE } from '@shukun/electron';
import { MetadataElectron } from '@shukun/schema';

import { ElectronFactoryInterface } from '../electron-factory';

export class FloatElectron implements ElectronFactoryInterface {
  buildSqlSchema(electron: MetadataElectron): string {
    const precision = electron.precision ?? FLOAT_DEFAULT_PRECISION;
    const scale = electron.scale ?? FLOAT_DEFAULT_SCALE;

    return `.float('${electron.name}', ${precision}, ${scale})`;
  }
}
