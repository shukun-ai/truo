import { MetadataElectron } from '@shukun/schema';
import { Schema } from 'mongoose';

import { ElectronFactoryInterface, MongooseSchema } from '../electron-factory';
import { isMaxLength } from '../validation/is-max-length';

export class TextElectron implements ElectronFactoryInterface {
  MAX_LENGTH = 1000;

  buildSqlSchema(electron: MetadataElectron): string {
    return `.string('${electron.name}', ${this.MAX_LENGTH})`;
  }

  buildMongooseSchema(): MongooseSchema {
    return {
      type: Schema.Types.String,
    };
  }

  validateElectron(electron: MetadataElectron): void {
    return;
  }

  validateValue(value: unknown): string[] {
    const errorMessages = [];

    if (isMaxLength(value, this.MAX_LENGTH)) {
      errorMessages.push(`The allowed max value is ${this.MAX_LENGTH}.`);
    }

    return errorMessages;
  }
}
