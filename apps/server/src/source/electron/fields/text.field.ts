import { ElectronValueException } from '@shukun/exception';
import { MetadataElectron } from '@shukun/schema';
import { isMaxLength, TEXT_MAX_LENGTH } from '@shukun/validator';
import { Schema } from 'mongoose';

import {
  ElectronExceptions,
  MongooseSchema,
} from '../electron-field.interface';
import { IElectronInterpreter } from '../electron-interpreter.interface';

export class TextField implements IElectronInterpreter {
  constructor(private readonly electron: MetadataElectron) {}

  validateValue(value: unknown): ElectronExceptions {
    const errorMessages: ElectronExceptions = [];

    if (isMaxLength(value, TEXT_MAX_LENGTH)) {
      errorMessages.push(
        new ElectronValueException(
          `{{electronName}}: should be less than {{maxLength}}.`,
          {
            electronName: this.electron.name,
            maxLength: TEXT_MAX_LENGTH,
          },
        ),
      );
    }

    return errorMessages;
  }

  buildSchema(): MongooseSchema {
    return {
      type: Schema.Types.String,
    };
  }
}
