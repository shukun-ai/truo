import { Options } from 'ajv';

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
  flowSchema,
  flowEventChoiceSchema,
  flowEventSuccessSchema,
  flowEventFailSchema,
  flowEventSourceQuerySchema,
  flowEventsSchema,
  flowEventSourceCreateSchema,
  flowEventSourceUpdateSchema,
  flowEventSourceDeleteSchema,
  flowEventSourceAddToManySchema,
  flowEventSourceRemoveFromManySchema,
  flowEventSourceIncreaseSchema,
  flowEventRepeatSchema,
  flowEventStoreSchema,
  flowEventParallelSchema,
  flowEventFirstOrThrowSchema,
  flowEventLastOrThrowSchema,
  scheduleSchema,
} from '../../json-exports';

import { createBaseAjv } from './base-ajv';

export function createApplicationAjv(options?: Options) {
  const validate = createBaseAjv(options)
    .addSchema(applicationSchema, 'application.schema.json')
    .addSchema(metadataSchema, 'metadata.schema.json')
    .addSchema(viewSchema, 'view.schema.json')
    .addSchema(roleSchema, 'role.schema.json')
    .addSchema(workflowSchema, 'workflow.schema.json')
    .addSchema(flowSchema, 'flow.schema.json')
    .addSchema(scheduleSchema, 'schedule.schema.json')
    .addSchema(ruleEngineSchema, 'utils/rule-engine.schema.json')
    // Workflow subordinates
    .addSchema(
      workflowConfigurationsSchema,
      'workflows/configurations.schema.json',
    )
    .addSchema(workflowCatchesSchema, 'workflows/catches.schema.json')
    .addSchema(workflowChoiceStateSchema, 'workflows/choice-state.schema.json')
    .addSchema(workflowChoicesSchema, 'workflows/choices.schema.json')
    .addSchema(workflowComparisonSchema, 'workflows/comparison.schema.json')
    .addSchema(workflowFailStateSchema, 'workflows/fail-state.schema.json')
    .addSchema(workflowPassStateSchema, 'workflows/pass-state.schema.json')
    .addSchema(workflowRetriesSchema, 'workflows/retries.schema.json')
    .addSchema(workflowTaskStateSchema, 'workflows/task-state.schema.json')
    // Flow subordinates
    .addSchema(flowEventsSchema, 'flow/events.schema.json')
    .addSchema(flowEventSuccessSchema, 'flow/event/success.schema.json')
    .addSchema(flowEventFailSchema, 'flow/event/fail.schema.json')
    .addSchema(
      flowEventSourceQuerySchema,
      'flow/event/source-query.schema.json',
    )
    .addSchema(
      flowEventSourceCreateSchema,
      'flow/event/source-create.schema.json',
    )
    .addSchema(
      flowEventSourceUpdateSchema,
      'flow/event/source-update.schema.json',
    )
    .addSchema(
      flowEventSourceDeleteSchema,
      'flow/event/source-delete.schema.json',
    )
    .addSchema(
      flowEventSourceAddToManySchema,
      'flow/event/source-add-to-many.schema.json',
    )
    .addSchema(
      flowEventSourceRemoveFromManySchema,
      'flow/event/source-remove-from-many.schema.json',
    )
    .addSchema(
      flowEventSourceIncreaseSchema,
      'flow/event/source-increase.schema.json',
    )
    .addSchema(flowEventChoiceSchema, 'flow/event/choice.schema.json')
    .addSchema(flowEventRepeatSchema, 'flow/event/repeat.schema.json')
    .addSchema(flowEventParallelSchema, 'flow/event/parallel.schema.json')
    .addSchema(flowEventStoreSchema, 'flow/event/store.schema.json')
    .addSchema(
      flowEventFirstOrThrowSchema,
      'flow/event/first-or-throw.schema.json',
    )
    .addSchema(
      flowEventLastOrThrowSchema,
      'flow/event/last-or-throw.schema.json',
    );

  return validate;
}
