import { MetadataElectron } from '@shukun/schema';

import { ElectronFactoryInterface } from '../electron-factory';

export class IntegerElectron implements ElectronFactoryInterface {
  sqlSchemaBuilder(electron: MetadataElectron) {
    return `table.integer('${electron.name}');`;
  }
}
