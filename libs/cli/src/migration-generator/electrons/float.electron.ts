import { MetadataElectron } from '@shukun/schema';

import { ElectronFactoryInterface } from '../electron-factory';

export class FloatElectron implements ElectronFactoryInterface {
  sqlSchemaBuilder(electron: MetadataElectron) {
    return `table.float('${electron.name}', ${
      electron.precision === undefined ? 'undefined' : electron.precision
    }, ${electron.scale === undefined ? 'undefined' : electron.scale} );`;
  }
}
