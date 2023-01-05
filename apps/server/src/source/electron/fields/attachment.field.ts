import { JSONSchemaType } from 'ajv';
import { Schema } from 'mongoose';

import { ajv } from '../../../util/schema/ajv';
import { ElectronType, SchemaBuilderResult } from '../electron-field.interface';

interface AttachmentValue {
  mime: string;
  path: string;
  size: number;
  name: string;
}

// @todo rewrite in JSON file.
// eslint-disable-next-line
// @ts-ignore
const valueSchema: JSONSchemaType<AttachmentValue[]> = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      mime: { type: 'string' },
      path: { type: 'string' },
      size: { type: 'integer' },
      name: { type: 'string' },
    },
    required: ['mime', 'path', 'size', 'name'],
    additionalProperties: false,
  },
};

export class AttachmentField implements ElectronType {
  validateValue(value: unknown): string[] {
    const messages: string[] = [];
    const validate = ajv.compile(valueSchema);

    if (!validate?.(value)) {
      messages.push('value 的格式不正确。');
    }

    return messages;
  }

  buildSchema(): SchemaBuilderResult {
    return {
      type: [Schema.Types.Mixed],
    };
  }
}
