import { ElectronValueException } from '@shukun/exception';
import {
  DataSourceType,
  MetadataElectron,
  validateAttachmentsSchema,
} from '@shukun/schema';
import { Schema } from 'mongoose';

import {
  ElectronExceptions,
  ElectronType,
  MongooseSchema,
} from '../electron-field.interface';

export class AttachmentField implements ElectronType {
  validateValue(value: unknown): ElectronExceptions {
    const messages = [];

    if (!validateAttachmentsSchema(value)) {
      messages.push(
        new ElectronValueException('should be a attachment format.'),
      );
    }

    return messages;
  }

  buildSchema(): MongooseSchema {
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
