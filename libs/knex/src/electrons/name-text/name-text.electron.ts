import { MetadataElectronNameText } from '@shukun/schema';
import { NAME_TEXT_MAX_LENGTH } from '@shukun/validator';

import { IElectronBuilder } from '../electron-builder.interface';

export class NameTextElectron implements IElectronBuilder {
  constructor(private readonly electron: MetadataElectronNameText) {}

  buildSqlSchema(): string {
    return `.string('${this.electron.name}', ${NAME_TEXT_MAX_LENGTH})`;
  }
}
