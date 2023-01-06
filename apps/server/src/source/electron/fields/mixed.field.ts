import { Schema } from 'mongoose';

import { ElectronType, SchemaBuilderResult } from '../electron-field.interface';

export class MixedField implements ElectronType {
  validateValue() {
    return [];
  }

  buildSchema(): SchemaBuilderResult {
    return {
      type: Schema.Types.Mixed,
    };
  }

  // TODO set beforeSave for SQL source
  // @see {@link https://knexjs.org/guide/schema-builder.html#json}
  // JSON.stringify(mightBeAnArray)
}
