import { MetadataElectron } from '@shukun/schema';
import { Schema } from 'mongoose';

import { ElectronFactoryInterface, MongooseSchema } from '../electron-factory';

export class LargeTextElectron implements ElectronFactoryInterface {
  buildSqlSchema(electron: MetadataElectron): string {
    return `table.text('${electron.name}');`;
  }

  buildMongooseSchema(): MongooseSchema {
    return {
      type: Schema.Types.String,
    };
  }

  validateElectron(electron: MetadataElectron): void {
    return;
  }

  validateValue(): string[] {
    return [];
  }
}
