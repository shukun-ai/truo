import { MetadataElectron } from '@shukun/schema';

import { ElectronFactoryInterface } from '../electron-factory';

export class PasswordElectron implements ElectronFactoryInterface {
  sqlSchemaBuilder(electron: MetadataElectron) {
    return `table.string('${electron.name}', 1000);`;
  }
}
