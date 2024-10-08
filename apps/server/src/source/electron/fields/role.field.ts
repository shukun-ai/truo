import { Schema } from 'mongoose';

import { MongooseSchema } from '../electron-field.interface';

import { IElectronInterpreter } from '../electron-interpreter.interface';

export class RoleField implements IElectronInterpreter {
  validateValue() {
    return [];
  }

  buildSchema(): MongooseSchema {
    return {
      type: [Schema.Types.String],
    };
  }
}
