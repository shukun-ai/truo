import { Schema } from 'mongoose';

import { MongooseSchema } from '../electron-field.interface';
import { IElectronInterpreter } from '../electron-interpreter.interface';

export class ManyToManyField implements IElectronInterpreter {
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
