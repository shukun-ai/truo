import Ajv from "ajv";
import { AttachmentsSchema } from "src/types/attachments";

import * as attachmentsSchema from "../../json-schemas/attachments.schema.json";

export const validateAttachmentsSchema = new Ajv().compile<AttachmentsSchema>(
  attachmentsSchema
);
