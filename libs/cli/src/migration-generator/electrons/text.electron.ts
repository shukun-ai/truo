import { MetadataElectron } from '@shukun/schema';
import { TEXT_MAX_LENGTH } from '@shukun/validator';

import { ElectronFactoryInterface } from '../electron-factory';

export class TextElectron implements ElectronFactoryInterface {
  buildSqlSchema(electron: MetadataElectron): string {
    return `.string('${electron.name}', ${TEXT_MAX_LENGTH})`;
  }
}
