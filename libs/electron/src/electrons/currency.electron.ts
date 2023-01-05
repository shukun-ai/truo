import { MetadataElectron } from '@shukun/schema';

import { ElectronFactoryInterface } from '../electron-factory';
import { buildConstraint } from '../sql-schema/build-constraint';

export class CurrencyElectron implements ElectronFactoryInterface {
  DEFAULT_PRECISION = 15;
  DEFAULT_SCALE = 4;

  buildSqlSchema(electron: MetadataElectron) {
    this.validateElectron(electron);

    const precision = this.DEFAULT_PRECISION;
    const scale = this.DEFAULT_SCALE;
    const constraint = buildConstraint(electron);

    return `table.float('${electron.name}', ${precision}, ${scale})${constraint};`;
  }

  validateElectron(electron: MetadataElectron) {
    if (electron.precision && electron.scale) {
      throw new Error(
        'Please remove precision and scale, those value is not used for Currency type.',
      );
    }
  }
}
