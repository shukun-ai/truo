import Ajv from 'ajv';

import { AttachmentsSchema } from '../../types/attachments';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const attachmentsSchema = require('../../json-schemas/attachments.schema.json');

export const validateAttachmentsSchema = new Ajv().compile<AttachmentsSchema>(
  attachmentsSchema,
);
