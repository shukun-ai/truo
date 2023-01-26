import { MetadataElectronSingleSelect } from '@shukun/schema';
import { SINGLE_SELECT_MAX_LENGTH } from '@shukun/validator';

import { ElectronFactoryInterface } from '../electron-factory';

export class SingleSelectElectron implements ElectronFactoryInterface {
  constructor(private readonly electron: MetadataElectronSingleSelect) {}

  buildSqlSchema(): string {
    return `.string('${this.electron.name}', ${SINGLE_SELECT_MAX_LENGTH})`;
  }
}
