import { MetadataElectron } from '@shukun/schema';
import { Schema } from 'mongoose';

import { ElectronFactoryInterface, MongooseSchema } from '../electron-factory';
import { buildConstraint } from '../sql-schema/build-constraint';

export class FloatElectron implements ElectronFactoryInterface {
  DEFAULT_PRECISION = 8;
  DEFAULT_SCALE = 2;

  buildSqlSchema(electron: MetadataElectron): string {
    const precision = electron.precision ?? this.DEFAULT_PRECISION;
    const scale = electron.scale ?? this.DEFAULT_SCALE;
    const constraint = buildConstraint(electron);

    return `table.float('${electron.name}', ${precision}, ${scale})${constraint};`;
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
