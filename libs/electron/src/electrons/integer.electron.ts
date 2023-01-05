import { MetadataElectron } from '@shukun/schema';
import { Schema } from 'mongoose';

import { ElectronFactoryInterface, MongooseSchema } from '../electron-factory';

export class IntegerElectron implements ElectronFactoryInterface {
  buildSqlSchema(electron: MetadataElectron): string {
    return `table.integer('${electron.name}');`;
  }

  buildMongooseSchema(): MongooseSchema {
    return {
      type: Schema.Types.Number,
    };
  }

  validateElectron(electron: MetadataElectron): void {
    return;
  }

  validateValue(): string[] {
    return [];
  }
}
