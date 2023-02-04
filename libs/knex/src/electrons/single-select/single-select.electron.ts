import { MetadataElectronSingleSelect } from '@shukun/schema';
import { SINGLE_SELECT_MAX_LENGTH } from '@shukun/validator';

import { IElectronBuilder } from '../electron-builder.interface';

export class SingleSelectElectron implements IElectronBuilder {
  constructor(private readonly electron: MetadataElectronSingleSelect) {}

  buildSqlSchema(): string {
    return `.string('${this.electron.name}', ${SINGLE_SELECT_MAX_LENGTH})`;
  }
}
