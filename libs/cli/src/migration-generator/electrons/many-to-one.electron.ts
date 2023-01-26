import { MetadataElectronManyToOne } from '@shukun/schema';
import { MANY_TO_ONE_MAX_LENGTH } from '@shukun/validator';

import { ElectronFactoryInterface } from '../electron-factory';

export class ManyToOneElectron implements ElectronFactoryInterface {
  constructor(private readonly electron: MetadataElectronManyToOne) {}

  buildSqlSchema(): string {
    return `.string('${this.electron.name}', ${MANY_TO_ONE_MAX_LENGTH})`;
  }
}
