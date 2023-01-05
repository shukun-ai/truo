import { MetadataElectron } from '@shukun/schema';
import { Schema } from 'mongoose';

import { ElectronFactoryInterface, MongooseSchema } from '../electron-factory';

export class IsSystemElectron implements ElectronFactoryInterface {
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
    const errorMessage = [];

    if (typeof value !== 'boolean') {
      errorMessage.push('should be a boolean.');
    }

    return errorMessage;
  }
}
