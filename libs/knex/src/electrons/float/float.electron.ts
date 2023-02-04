import { MetadataElectronFloat } from '@shukun/schema';
import {
  FLOAT_DEFAULT_PRECISION,
  FLOAT_DEFAULT_SCALE,
} from '@shukun/validator';

import { IElectronBuilder } from '../electron-builder.interface';

export class FloatElectron implements IElectronBuilder {
  constructor(private readonly electron: MetadataElectronFloat) {}

  buildSqlSchema(): string {
    const precision = this.electron.precision ?? FLOAT_DEFAULT_PRECISION;
    const scale = this.electron.scale ?? FLOAT_DEFAULT_SCALE;

    return `.float('${this.electron.name}', ${precision}, ${scale})`;
  }
}
