import { MetadataElectronAttachment } from '@shukun/schema';

import { IElectronBuilder } from '../electron-builder.interface';

export class AttachmentElectron implements IElectronBuilder {
  constructor(private readonly electron: MetadataElectronAttachment) {}

  buildSqlSchema(): string {
    return `.json('${this.electron.name}')`;
  }
}
