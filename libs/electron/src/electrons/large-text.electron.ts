import { MetadataElectron } from '@shukun/schema';

import { ElectronFactoryInterface } from '../electron-factory';

export class LargeTextElectron implements ElectronFactoryInterface {
  buildSqlSchema(electron: MetadataElectron) {
    return `table.text('${electron.name}');`;
  }
}
