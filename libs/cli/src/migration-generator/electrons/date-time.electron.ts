import { MetadataElectronDateTime } from '@shukun/schema';

import { ElectronFactoryInterface } from '../electron-factory';

export class DateTimeElectron implements ElectronFactoryInterface {
  constructor(private readonly electron: MetadataElectronDateTime) {}

  buildSqlSchema(): string {
    return `.timestamp('${this.electron.name}')`;
  }
}
