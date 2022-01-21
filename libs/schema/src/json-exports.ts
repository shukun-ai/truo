import { ApplicationSchema } from "./types/application";

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const initialApplication: ApplicationSchema = require("./internals/seed/initial-application.json");

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const applicationSchema = require("./json-schemas/application.schema.json");

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const metadataSchema = require("./json-schemas/metadata.schema.json");

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const roleSchema = require("./json-schemas/role.schema.json");

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const ruleEngineSchema = require("./json-schemas/utils/rule-engine.schema.json");

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const viewSchema = require("./json-schemas/view.schema.json");

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const workflowSchema = require("./json-schemas/workflow.schema.json");

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const workflowCatchesSchema = require("./json-schemas/workflows/catches.schema.json");

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const workflowChoiceStateSchema = require("./json-schemas/workflows/choice-state.schema.json");

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const workflowChoicesSchema = require("./json-schemas/workflows/choices.schema.json");

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const workflowComparisonSchema = require("./json-schemas/workflows/comparison.schema.json");

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const workflowConfigurationsSchema = require("./json-schemas/workflows/configurations.schema.json");

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const workflowFailStateSchema = require("./json-schemas/workflows/fail-state.schema.json");

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const workflowPassStateSchema = require("./json-schemas/workflows/pass-state.schema.json");

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const workflowRetriesSchema = require("./json-schemas/workflows/retries.schema.json");

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const workflowTaskStateSchema = require("./json-schemas/workflows/task-state.schema.json");

