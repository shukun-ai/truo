import { Schema } from 'mongoose';
import {
  isEngineName,
  isStartedWithLowercase,
} from '../../../util/validation/decorators';

import { ElectronType, SchemaBuilderResult } from '../electron-field.interface';

export class NameTextField implements ElectronType {
  validateValue(value: unknown): string[] {
    const errorMessage = [];

    if (!isEngineName(value)) {
      errorMessage.push(`should be a-z, 0-9 or _ .`);
    }

    if (!isStartedWithLowercase(value)) {
      errorMessage.push('should be started with a-z.');
    }

    return errorMessage;
  }

  buildSchema(): SchemaBuilderResult {
    return {
      type: Schema.Types.String,
    };
  }
}
