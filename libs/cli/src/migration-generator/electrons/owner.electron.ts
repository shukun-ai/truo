import { MetadataElectron } from '@shukun/schema';

import { ElectronFactoryInterface } from '../electron-factory';

export class OwnerElectron implements ElectronFactoryInterface {
  sqlSchemaBuilder(electron: MetadataElectron) {
    return `table.string('${electron.name}', 255);`;
  }
}
