import { MetadataElectronNameText } from '@shukun/schema';
import { NAME_TEXT_MAX_LENGTH } from '@shukun/validator';

import { ElectronFactoryInterface } from '../electron-factory';

export class NameTextElectron implements ElectronFactoryInterface {
  constructor(private readonly electron: MetadataElectronNameText) {}

  buildSqlSchema(): string {
    return `.string('${this.electron.name}', ${NAME_TEXT_MAX_LENGTH})`;
  }
}
