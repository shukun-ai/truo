import { MetadataElectron } from '@shukun/schema';

import { ElectronFactoryInterface } from '../electron-factory';
import { buildConstraint } from '../sql-schema/build-constraint';

export class FloatElectron implements ElectronFactoryInterface {
  DEFAULT_PRECISION = 8;
  DEFAULT_SCALE = 2;

  sqlSchemaBuilder(electron: MetadataElectron) {
    const precision = electron.precision ?? this.DEFAULT_PRECISION;
    const scale = electron.scale ?? this.DEFAULT_SCALE;
    const constraint = buildConstraint(electron);

    return `table.float('${electron.name}', ${precision}, ${scale})${constraint};`;
  }
}
