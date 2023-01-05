import { MetadataElectron } from '@shukun/schema';

import { ElectronFactoryInterface } from '../electron-factory';

export class TextElectron implements ElectronFactoryInterface {
  MAX_LENGTH = 1000;

  buildSqlSchema(electron: MetadataElectron): string {
    return `.string('${electron.name}', ${this.MAX_LENGTH})`;
  }
}
