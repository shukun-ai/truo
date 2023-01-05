import { MetadataElectron } from '@shukun/schema';
import { Schema } from 'mongoose';

import { ElectronFactoryInterface, MongooseSchema } from '../electron-factory';

export class RoleElectron implements ElectronFactoryInterface {
  buildSqlSchema(electron: MetadataElectron): string {
    throw new Error('Did not support Role type in SQL Schema.');
  }

  buildMongooseSchema(): MongooseSchema {
    return {
      type: [Schema.Types.String],
    };
  }

  validateElectron(): void {
    return;
  }

  validateValue(): string[] {
    return [];
  }
}
