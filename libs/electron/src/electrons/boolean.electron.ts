import { MetadataElectron } from '@shukun/schema';
import { Schema } from 'mongoose';

import { ElectronFactoryInterface, MongooseSchema } from '../electron-factory';

export class BooleanElectron implements ElectronFactoryInterface {
  buildSqlSchema(electron: MetadataElectron): string {
    return `table.boolean('${electron.name}');`;
  }

  buildMongooseSchema(): MongooseSchema {
    return {
      type: Schema.Types.Boolean,
    };
  }

  validateElectron(electron: MetadataElectron): void {
    return;
  }

  validateValue(value: unknown): string[] {
    const errorMessages = [];

    if (typeof value !== 'boolean') {
      errorMessages.push('should be a boolean.');
    }

    return errorMessages;
  }
}
