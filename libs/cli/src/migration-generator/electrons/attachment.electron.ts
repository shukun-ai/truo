import { MetadataElectronAttachment } from '@shukun/schema';

import { ElectronFactoryInterface } from '../electron-factory';

export class AttachmentElectron implements ElectronFactoryInterface {
  constructor(private readonly electron: MetadataElectronAttachment) {}

  buildSqlSchema(): string {
    return `.json('${this.electron.name}')`;
  }
}
