import { isMaxLength } from '@shukun/electron';
import { Schema } from 'mongoose';

import { ElectronType, SchemaBuilderResult } from '../electron-field.interface';

export class TextField implements ElectronType {
  MAX_LENGTH = 1000;

  validateValue(value: unknown): string[] {
    const errorMessages = [];

    if (isMaxLength(value, this.MAX_LENGTH)) {
      errorMessages.push(`The allowed max value is ${this.MAX_LENGTH}.`);
    }

    return errorMessages;
  }

  buildSchema(): SchemaBuilderResult {
    return {
      type: Schema.Types.String,
    };
  }
}
