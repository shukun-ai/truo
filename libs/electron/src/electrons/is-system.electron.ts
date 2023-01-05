import { MetadataElectron } from '@shukun/schema';

import { ElectronFactoryInterface } from '../electron-factory';

export class IsSystemElectron implements ElectronFactoryInterface {
  buildSqlSchema(electron: MetadataElectron) {
    return `table.boolean('${electron.name}');`;
  }
}
