import { MetadataElectron } from '@shukun/schema';
import Ajv from 'ajv';
import { Schema } from 'mongoose';

import { ElectronFactoryInterface, MongooseSchema } from '../electron-factory';

export interface AttachmentValue {
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

export class AttachmentElectron implements ElectronFactoryInterface {
  buildSqlSchema(electron: MetadataElectron): string {
    return `table.json('${electron.name}');`;
  }

  buildMongooseSchema(): MongooseSchema {
    return {
      type: [Schema.Types.Mixed],
    };
  }

  validateElectron(electron: MetadataElectron): void {
    return;
  }

  validateValue(value: unknown): string[] {
    const messages: string[] = [];
    const ajv = new Ajv();
    const validate = ajv.compile(valueSchema);

    if (!validate?.(value)) {
      messages.push('value 的格式不正确。');
    }

    return messages;
  }
}
