import Ajv, { Options } from "ajv";
import { isEmail, isISO8601 } from "class-validator";

import {
  applicationSchema,
  metadataSchema,
  roleSchema,
  ruleEngineSchema,
  viewSchema,
  workflowSchema,
  workflowCatchesSchema,
  workflowChoiceStateSchema,
  workflowChoicesSchema,
  workflowComparisonSchema,
  workflowConfigurationsSchema,
  workflowFailStateSchema,
  workflowPassStateSchema,
  workflowRetriesSchema,
  workflowTaskStateSchema,
} from "../../json-exports";

export function createAjv(options?: Options) {
  const ajv = new Ajv(options);

  const validate = ajv
    .addKeyword("tsEnumNames")
    .addFormat("email", {
      type: "string",
      validate: (value: string) => isEmail(value),
    })
    .addFormat("dateTimeISO", {
      type: "string",
      validate: (value: string) => isISO8601(value, { strict: true }),
    })
    .addFormat("apiName", {
      type: "string",
      validate: (value: string) => {
        const regex = new RegExp(/^[a-z0-9_]*$/);
        return regex.test(value);
      },
    })
    .addSchema(applicationSchema, "application.schema.json")
    .addSchema(metadataSchema, "metadata.schema.json")
    .addSchema(viewSchema, "view.schema.json")
    .addSchema(roleSchema, "role.schema.json")
    .addSchema(workflowSchema, "workflow.schema.json")
    .addSchema(ruleEngineSchema, "utils/rule-engine.schema.json")
    .addSchema(
      workflowConfigurationsSchema,
      "workflows/configurations.schema.json"
    )
    .addSchema(workflowCatchesSchema, "workflows/catches.schema.json")
    .addSchema(workflowChoiceStateSchema, "workflows/choice-state.schema.json")
    .addSchema(workflowChoicesSchema, "workflows/choices.schema.json")
    .addSchema(workflowComparisonSchema, "workflows/comparison.schema.json")
    .addSchema(workflowFailStateSchema, "workflows/fail-state.schema.json")
    .addSchema(workflowPassStateSchema, "workflows/pass-state.schema.json")
    .addSchema(workflowRetriesSchema, "workflows/retries.schema.json")
    .addSchema(workflowTaskStateSchema, "workflows/task-state.schema.json");

  return validate;
}
