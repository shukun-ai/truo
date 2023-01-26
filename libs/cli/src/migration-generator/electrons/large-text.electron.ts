import { MetadataElectronLargeText } from '@shukun/schema';

import { ElectronFactoryInterface } from '../electron-factory';

export class LargeTextElectron implements ElectronFactoryInterface {
  constructor(private readonly electron: MetadataElectronLargeText) {}

  buildSqlSchema(): string {
    return `.text('${this.electron.name}')`;
  }
}
