import { MetadataElectron } from '@shukun/schema';

import { ElectronFactoryInterface } from '../electron-factory';

/**
 * @deprecated The Role did not be supported by SQL
 */
export class RoleElectron implements ElectronFactoryInterface {
  sqlSchemaBuilder(electron: MetadataElectron) {
    return `table.json('${electron.name}');`;
  }
}
