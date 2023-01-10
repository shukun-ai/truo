import { SINGLE_SELECT_MAX_LENGTH } from '@shukun/schema';
import { MetadataElectron } from '@shukun/schema';

import { ElectronFactoryInterface } from '../electron-factory';

export class SingleSelectElectron implements ElectronFactoryInterface {
  buildSqlSchema(electron: MetadataElectron): string {
    return `.string('${electron.name}', ${SINGLE_SELECT_MAX_LENGTH})`;
  }
}
