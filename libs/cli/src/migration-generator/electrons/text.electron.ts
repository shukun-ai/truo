import { TEXT_MAX_LENGTH } from '@shukun/electron';
import { MetadataElectron } from '@shukun/schema';

import { ElectronFactoryInterface } from '../electron-factory';

export class TextElectron implements ElectronFactoryInterface {
  buildSqlSchema(electron: MetadataElectron): string {
    return `.string('${electron.name}', ${TEXT_MAX_LENGTH})`;
  }
}
