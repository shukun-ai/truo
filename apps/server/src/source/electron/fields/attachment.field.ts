import {
  DataSourceType,
  MetadataElectron,
  validateAttachmentsSchema,
} from '@shukun/schema';
import { Schema } from 'mongoose';

import { ElectronType, SchemaBuilderResult } from '../electron-field.interface';

export class AttachmentField implements ElectronType {
  validateValue(value: unknown): string[] {
    const messages: string[] = [];

    if (!validateAttachmentsSchema(value)) {
      messages.push('附件的格式不正确。');
    }

    return messages;
  }

  buildSchema(): SchemaBuilderResult {
    return {
      type: [Schema.Types.Mixed],
    };
  }

  // @see {@link https://knexjs.org/guide/schema-builder.html#json}
  // JSON.stringify(mightBeAnArray)
  beforeSave(
    value: unknown,
    electron: MetadataElectron,
    connectionType: DataSourceType,
  ): unknown {
    if (connectionType === 'postgres') {
      return JSON.stringify(value);
    } else {
      return value;
    }
  }
}
