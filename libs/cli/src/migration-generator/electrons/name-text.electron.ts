import { MetadataElectron } from '@shukun/schema';

import { ElectronFactoryInterface } from '../electron-factory';

export class NameTextElectron implements ElectronFactoryInterface {
  buildSqlSchema(electron: MetadataElectron): string {
    return `.string('${electron.name}', 1000)`;
  }
}
