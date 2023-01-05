import { MetadataElectron } from '@shukun/schema';
import { Schema } from 'mongoose';

import { ElectronFactoryInterface, MongooseSchema } from '../electron-factory';
import { isEngineName } from '../validation/is-engine-name';
import { isStartedWithLowercase } from '../validation/is-started-with-lowercase';

export class NameTextElectron implements ElectronFactoryInterface {
  buildSqlSchema(electron: MetadataElectron): string {
    return `table.string('${electron.name}', 1000);`;
  }

  buildMongooseSchema(): MongooseSchema {
    return {
      type: Schema.Types.String,
    };
  }

  validateElectron(electron: MetadataElectron): void {
    return;
  }

  validateValue(value: unknown): string[] {
    const errorMessages = [];

    if (!isEngineName(value)) {
      errorMessages.push(`should be a-z, 0-9 or _ .`);
    }

    if (!isStartedWithLowercase(value)) {
      errorMessages.push('should be started with a-z.');
    }

    return errorMessages;
  }
}
