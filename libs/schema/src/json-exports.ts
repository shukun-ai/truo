import { ApplicationSchema } from './types/application';

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const initialApplication: ApplicationSchema = require('./internals/seed/initial-application.json');

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const applicationSchema = require('./json-schemas/application.schema.json');

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const metadataSchema = require('./json-schemas/metadata.schema.json');

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const roleSchema = require('./json-schemas/role.schema.json');

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const ruleEngineSchema = require('./json-schemas/utils/rule-engine.schema.json');

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const viewSchema = require('./json-schemas/view.schema.json');

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const workflowSchema = require('./json-schemas/workflow.schema.json');

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const flowSchema = require('./json-schemas/flow.schema.json');

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const workflowCatchesSchema = require('./json-schemas/workflows/catches.schema.json');

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const workflowChoiceStateSchema = require('./json-schemas/workflows/choice-state.schema.json');

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const workflowChoicesSchema = require('./json-schemas/workflows/choices.schema.json');

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const workflowComparisonSchema = require('./json-schemas/workflows/comparison.schema.json');

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const workflowConfigurationsSchema = require('./json-schemas/workflows/configurations.schema.json');

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const workflowFailStateSchema = require('./json-schemas/workflows/fail-state.schema.json');

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const workflowPassStateSchema = require('./json-schemas/workflows/pass-state.schema.json');

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const workflowRetriesSchema = require('./json-schemas/workflows/retries.schema.json');

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const workflowTaskStateSchema = require('./json-schemas/workflows/task-state.schema.json');

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const flowEventsSchema = require('./json-schemas/flow/events.schema.json');

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const flowEventSuccessSchema = require('./json-schemas/flow/event/success.schema.json');

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const flowEventFailSchema = require('./json-schemas/flow/event/fail.schema.json');

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const flowEventSourceQuerySchema = require('./json-schemas/flow/event/source-query.schema.json');

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const flowEventSourceCreateSchema = require('./json-schemas/flow/event/source-create.schema.json');

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const flowEventSourceUpdateSchema = require('./json-schemas/flow/event/source-update.schema.json');

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const flowEventSourceDeleteSchema = require('./json-schemas/flow/event/source-delete.schema.json');

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const flowEventSourceAddToManySchema = require('./json-schemas/flow/event/source-add-to-many.schema.json');

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const flowEventSourceRemoveFromManySchema = require('./json-schemas/flow/event/source-remove-from-many.schema.json');

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const flowEventSourceIncreaseSchema = require('./json-schemas/flow/event/source-increase.schema.json');

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const flowEventChoiceSchema = require('./json-schemas/flow/event/choice.schema.json');

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const flowEventRepeatSchema = require('./json-schemas/flow/event/repeat.schema.json');

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const flowEventParallelSchema = require('./json-schemas/flow/event/parallel.schema.json');

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const flowEventStoreSchema = require('./json-schemas/flow/event/store.schema.json');

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const flowEventFirstOrThrowSchema = require('./json-schemas/flow/event/first-or-throw.schema.json');

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const flowEventLastOrThrowSchema = require('./json-schemas/flow/event/last-or-throw.schema.json');
