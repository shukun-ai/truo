import { AttachmentsSchema, attachmentsSchema } from '@shukun/schema';
import Ajv from 'ajv';

export const validateAttachmentsSchema = new Ajv().compile<AttachmentsSchema>(
  attachmentsSchema,
);
