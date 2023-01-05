import { MetadataElectron } from '@shukun/schema';
import { Schema } from 'mongoose';

import { ElectronFactoryInterface, MongooseSchema } from '../electron-factory';

export class ManyToManyElectron implements ElectronFactoryInterface {
  buildSqlSchema(electron: MetadataElectron): string {
    throw new Error('Did not support ManyToMany type in SQL Schema.');
  }

  buildMongooseSchema(): MongooseSchema {
    return {
      type: [
        {
          type: Schema.Types.ObjectId,
        },
      ],
    };
  }

  validateElectron(electron: MetadataElectron): void {
    return;
  }

  validateValue(): string[] {
    return [];
  }
}
