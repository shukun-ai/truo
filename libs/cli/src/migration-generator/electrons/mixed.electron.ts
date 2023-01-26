import { MetadataElectronMixed } from '@shukun/schema';

import { ElectronFactoryInterface } from '../electron-factory';

export class MixedElectron implements ElectronFactoryInterface {
  constructor(private readonly electron: MetadataElectronMixed) {}

  buildSqlSchema(): string {
    return `.json('${this.electron.name}')`;
  }
}
