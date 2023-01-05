import { MetadataElectron } from '@shukun/schema';

import { ElectronFactoryInterface } from '../electron-factory';

/**
 * @deprecated The Role did not be supported by SQL
 */
export class MultiSelectElectron implements ElectronFactoryInterface {
  buildSqlSchema(electron: MetadataElectron) {
    return `table.json('${electron.name}');`;
  }
}
