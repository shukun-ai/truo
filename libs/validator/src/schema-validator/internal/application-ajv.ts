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
  scheduleSchema,
  environmentSchema,
} from '@shukun/schema';
import { Options } from 'ajv';

import { createBaseAjv } from './base-ajv';

export function createApplicationAjv(options?: Options) {
  const validate = createBaseAjv(options)
    .addSchema(applicationSchema, 'application.schema.json')
    .addSchema(metadataSchema, 'application/metadata.schema.json')
    .addSchema(viewSchema, 'application/view.schema.json')
    .addSchema(roleSchema, 'application/role.schema.json')
    .addSchema(workflowSchema, 'application/workflow.schema.json')
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
    );

  return validate;
}
