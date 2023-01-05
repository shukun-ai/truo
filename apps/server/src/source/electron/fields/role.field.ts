import { Schema } from 'mongoose';

import { ElectronType, SchemaBuilderResult } from '../electron-field.interface';

export class RoleField implements ElectronType {
  validateValue() {
    return [];
  }

  buildSchema(): SchemaBuilderResult {
    return {
      type: [Schema.Types.String],
    };
  }
}
