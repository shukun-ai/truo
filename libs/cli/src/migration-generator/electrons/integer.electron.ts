import { MetadataElectronInteger } from '@shukun/schema';

import { ElectronFactoryInterface } from '../electron-factory';

export class IntegerElectron implements ElectronFactoryInterface {
  constructor(private readonly electron: MetadataElectronInteger) {}

  buildSqlSchema(): string {
    return `.bigInteger('${this.electron.name}')`;
  }
}
