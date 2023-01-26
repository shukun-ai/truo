import { MetadataElectronBoolean } from '@shukun/schema';

import { ElectronFactoryInterface } from '../electron-factory';

export class BooleanElectron implements ElectronFactoryInterface {
  constructor(private readonly electron: MetadataElectronBoolean) {}

  buildSqlSchema(): string {
    return `.boolean('${this.electron.name}')`;
  }
}
