import { MetadataElectron } from '@shukun/schema';
import { Schema } from 'mongoose';

import { ElectronFactoryInterface, MongooseSchema } from '../electron-factory';

export class ManyToOneElectron implements ElectronFactoryInterface {
  buildSqlSchema(electron: MetadataElectron): string {
    return `table.string('${electron.name}', 255);`;
  }

  buildMongooseSchema(): MongooseSchema {
    return {
      type: Schema.Types.ObjectId,
    };
  }

  validateElectron(electron: MetadataElectron): void {
    return;
  }

  validateValue(): string[] {
    return [];
  }
}
