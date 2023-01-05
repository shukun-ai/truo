import { MetadataElectron } from '@shukun/schema';
import { Schema } from 'mongoose';

import { ElectronFactoryInterface, MongooseSchema } from '../electron-factory';

export class SingleSelectElectron implements ElectronFactoryInterface {
  buildSqlSchema(electron: MetadataElectron): string {
    return `table.string('${electron.name}', 1000);`;
  }

  buildMongooseSchema(electron: MetadataElectron): MongooseSchema {
    return {
      type: Schema.Types.String,
      enum: (electron.options || []).map((option) => option.key),
    };
  }

  validateElectron(): void {
    return;
  }

  validateValue(): string[] {
    return [];
  }
}
