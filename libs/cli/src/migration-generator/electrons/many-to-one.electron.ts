import { MANY_TO_ONE_MAX_LENGTH } from '@shukun/electron';
import { MetadataElectron } from '@shukun/schema';

import { ElectronFactoryInterface } from '../electron-factory';

export class ManyToOneElectron implements ElectronFactoryInterface {
  buildSqlSchema(electron: MetadataElectron): string {
    return `.string('${electron.name}', ${MANY_TO_ONE_MAX_LENGTH})`;
  }
}
