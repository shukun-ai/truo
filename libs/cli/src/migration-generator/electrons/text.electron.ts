import { MetadataElectronText } from '@shukun/schema';
import { TEXT_MAX_LENGTH } from '@shukun/validator';

import { ElectronFactoryInterface } from '../electron-factory';

export class TextElectron implements ElectronFactoryInterface {
  constructor(private readonly electron: MetadataElectronText) {}

  buildSqlSchema(): string {
    return `.string('${this.electron.name}', ${TEXT_MAX_LENGTH})`;
  }
}
