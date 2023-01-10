import { Schema } from 'mongoose';

import { ElectronType, MongooseSchema } from '../electron-field.interface';

export class ManyToOneField implements ElectronType {
  validateValue() {
    return [];
  }

  buildSchema(): MongooseSchema {
    return {
      type: Schema.Types.ObjectId,
    };
  }
}
