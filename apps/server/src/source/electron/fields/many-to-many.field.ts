import { Schema } from 'mongoose';

import { SchemaBuilderResult, ElectronType } from '../electron-field.interface';

export class ManyToManyField implements ElectronType {
  validateValue() {
    return [];
  }

  buildSchema(): SchemaBuilderResult {
    return {
      type: [
        {
          type: Schema.Types.ObjectId,
        },
      ],
    };
  }
}
