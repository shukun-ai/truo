import { ElectronValueException } from '@shukun/exception';
import { DataSourceType } from '@shukun/schema';
import { attachmentsSchemaValidator } from '@shukun/validator';
import { Schema } from 'mongoose';

import {
  ElectronExceptions,
  MongooseSchema,
} from '../electron-field.interface';
import { IElectronInterpreter } from '../electron-interpreter.interface';

export class AttachmentField implements IElectronInterpreter {
  validateValue(value: unknown): ElectronExceptions {
    const messages = [];

    try {
      attachmentsSchemaValidator.validate(value);
    } catch (error) {
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
  beforeSave(value: unknown, connectionType: DataSourceType): unknown {
    if (connectionType === 'postgres') {
      return JSON.stringify(value);
    } else {
      return value;
    }
  }
}
