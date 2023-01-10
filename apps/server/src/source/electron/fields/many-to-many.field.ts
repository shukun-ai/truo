import { Schema } from 'mongoose';

import { MongooseSchema, ElectronType } from '../electron-field.interface';

export class ManyToManyField implements ElectronType {
  validateValue() {
    return [];
  }

  buildSchema(): MongooseSchema {
    return {
      type: [
        {
          type: Schema.Types.ObjectId,
        },
      ],
    };
  }
}
