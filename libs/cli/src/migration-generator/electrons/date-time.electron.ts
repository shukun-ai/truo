import { MetadataElectron } from '@shukun/schema';

import { ElectronFactoryInterface } from '../electron-factory';

export class DateTimeElectron implements ElectronFactoryInterface {
  sqlSchemaBuilder(electron: MetadataElectron) {
    return `table.timestamp('${electron.name}', { useTz: true });`;
  }
}
