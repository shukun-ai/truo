import { MetadataElectron } from '@shukun/schema';

import { ElectronFactoryInterface } from '../electron-factory';

export class MixedElectron implements ElectronFactoryInterface {
  buildSqlSchema(electron: MetadataElectron): string {
    return `table.json('${electron.name}');`;
  }
}
