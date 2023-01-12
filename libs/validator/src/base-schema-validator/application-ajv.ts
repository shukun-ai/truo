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
  environmentSchema,
  flowStoreSchema,
} from '@shukun/schema';
import { Options } from 'ajv';

import { createBaseAjv } from './base-ajv';

/**
 * @deprecated
 */
export function createApplicationAjv(options?: Options) {
  const validate = createBaseAjv(options)
    .addSchema(applicationSchema, 'application.schema.json')
    .addSchema(metadataSchema, 'application/metadata.schema.json')
    .addSchema(viewSchema, 'application/view.schema.json')
    .addSchema(roleSchema, 'application/role.schema.json')
    .addSchema(workflowSchema, 'application/workflow.schema.json')
    .addSchema(flowSchema, 'application/flow.schema.json')
    .addSchema(scheduleSchema, 'application/schedule.schema.json')
    .addSchema(environmentSchema, 'application/environment.schema.json')
    .addSchema(ruleEngineSchema, 'application/utils/rule-engine.schema.json')
    // Workflow subordinates
    .addSchema(
      workflowConfigurationsSchema,
      'application/workflows/configurations.schema.json',
    )
    .addSchema(
      workflowCatchesSchema,
      'application/workflows/catches.schema.json',
    )
    .addSchema(
      workflowChoiceStateSchema,
      'application/workflows/choice-state.schema.json',
    )
    .addSchema(
      workflowChoicesSchema,
      'application/workflows/choices.schema.json',
    )
    .addSchema(
      workflowComparisonSchema,
      'application/workflows/comparison.schema.json',
    )
    .addSchema(
      workflowFailStateSchema,
      'application/workflows/fail-state.schema.json',
    )
    .addSchema(
      workflowPassStateSchema,
      'application/workflows/pass-state.schema.json',
    )
    .addSchema(
      workflowRetriesSchema,
      'application/workflows/retries.schema.json',
    )
    .addSchema(
      workflowTaskStateSchema,
      'application/workflows/task-state.schema.json',
    )
    // Flow subordinates
    .addSchema(flowEventsSchema, 'application/flow/events.schema.json')
    .addSchema(flowStoreSchema, 'application/flow/store.schema.json')
    .addSchema(
      flowEventSuccessSchema,
      'application/flow/event/success.schema.json',
    )
    .addSchema(flowEventFailSchema, 'application/flow/event/fail.schema.json')
    .addSchema(
      flowEventSourceQuerySchema,
      'application/flow/event/source-query.schema.json',
    )
    .addSchema(
      flowEventSourceCreateSchema,
      'application/flow/event/source-create.schema.json',
    )
    .addSchema(
      flowEventSourceUpdateSchema,
      'application/flow/event/source-update.schema.json',
    )
    .addSchema(
      flowEventSourceDeleteSchema,
      'application/flow/event/source-delete.schema.json',
    )
    .addSchema(
      flowEventSourceAddToManySchema,
      'application/flow/event/source-add-to-many.schema.json',
    )
    .addSchema(
      flowEventSourceRemoveFromManySchema,
      'application/flow/event/source-remove-from-many.schema.json',
    )
    .addSchema(
      flowEventSourceIncreaseSchema,
      'application/flow/event/source-increase.schema.json',
    )
    .addSchema(
      flowEventChoiceSchema,
      'application/flow/event/choice.schema.json',
    )
    .addSchema(
      flowEventRepeatSchema,
      'application/flow/event/repeat.schema.json',
    )
    .addSchema(
      flowEventParallelSchema,
      'application/flow/event/parallel.schema.json',
    )
    .addSchema(flowEventStoreSchema, 'application/flow/event/store.schema.json')
    .addSchema(
      flowEventFirstOrThrowSchema,
      'application/flow/event/first-or-throw.schema.json',
    )
    .addSchema(
      flowEventLastOrThrowSchema,
      'application/flow/event/last-or-throw.schema.json',
    );

  return validate;
}
