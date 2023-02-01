import { MetadataElectronText } from '@shukun/schema';
import { TEXT_MAX_LENGTH } from '@shukun/validator';

import { IElectronBuilder } from '../electron-builder.interface';

export class TextElectron implements IElectronBuilder {
  constructor(private readonly electron: MetadataElectronText) {}

  buildSqlSchema(): string {
    return `.string('${this.electron.name}', ${TEXT_MAX_LENGTH})`;
  }
}
