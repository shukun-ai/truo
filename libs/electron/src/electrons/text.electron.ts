import { MetadataElectron } from '@shukun/schema';

import { ElectronFactoryInterface } from '../electron-factory';

export class TextElectron implements ElectronFactoryInterface {
  buildSqlSchema(electron: MetadataElectron) {
    return `table.string('${electron.name}', 1000);`;
  }
}
