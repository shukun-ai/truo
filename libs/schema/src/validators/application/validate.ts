import * as applicationSchema from "../../json-schemas/application.schema.json";
import { ApplicationSchema } from "../../types/application";
import { createAjv } from "../constructor/validate";

export const validateApplicationSchema =
  createAjv().compile<ApplicationSchema>(applicationSchema);
