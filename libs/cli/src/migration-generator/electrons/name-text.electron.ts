import { NAME_TEXT_MAX_LENGTH } from '@shukun/schema';
import { MetadataElectron } from '@shukun/schema';

import { ElectronFactoryInterface } from '../electron-factory';

export class NameTextElectron implements ElectronFactoryInterface {
  buildSqlSchema(electron: MetadataElectron): string {
    return `.string('${electron.name}', ${NAME_TEXT_MAX_LENGTH})`;
  }
}
