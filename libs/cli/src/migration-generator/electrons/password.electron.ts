import { PASSWORD_MAX_LENGTH } from '@shukun/electron';
import { MetadataElectron } from '@shukun/schema';

import { ElectronFactoryInterface } from '../electron-factory';

export class PasswordElectron implements ElectronFactoryInterface {
  buildSqlSchema(electron: MetadataElectron): string {
    return `.string('${electron.name}', ${PASSWORD_MAX_LENGTH})`;
  }
}
