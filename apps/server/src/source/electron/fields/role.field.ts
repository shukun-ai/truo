import { Schema } from 'mongoose';

import { ElectronType, MongooseSchema } from '../electron-field.interface';

export class RoleField implements ElectronType {
  validateValue() {
    return [];
  }

  buildSchema(): MongooseSchema {
    return {
      type: [Schema.Types.String],
    };
  }
}
