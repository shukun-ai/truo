import { MetadataElectron } from '@shukun/schema';
import { Schema } from 'mongoose';

import { ElectronFactoryInterface, MongooseSchema } from '../electron-factory';

export class CurrencyElectron implements ElectronFactoryInterface {
  DEFAULT_PRECISION = 15;
  DEFAULT_SCALE = 4;

  buildSqlSchema(electron: MetadataElectron): string {
    const precision = this.DEFAULT_PRECISION;
    const scale = this.DEFAULT_SCALE;

    return `.float('${electron.name}', ${precision}, ${scale})`;
  }

  buildMongooseSchema(): MongooseSchema {
    return {
      type: Schema.Types.Number,
    };
  }

  validateElectron(electron: MetadataElectron): void {
    if (electron.precision && electron.scale) {
      throw new Error(
        'Please remove precision and scale, those value is not used for Currency type.',
      );
    }
  }

  validateValue(value: unknown): string[] {
    const messages = [];

    if (typeof value !== 'number') {
      messages.push('The value must be number in Currency type.');
    }

    return messages;
  }
}
