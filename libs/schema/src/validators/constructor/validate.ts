import Ajv, { Options } from 'ajv';
import { isEmail, isISO8601 } from 'class-validator';

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
  FlowEventChoiceSchema,
  FlowEventSuccessSchema,
  FlowEventFailSchema,
  FlowEventSourceQuerySchema,
  FlowEventsSchema,
  FlowEventSourceCreateSchema,
  FlowEventSourceUpdateSchema,
  FlowEventSourceDeleteSchema,
  FlowEventSourceAddToManySchema,
  FlowEventSourceRemoveFromManySchema,
  FlowEventSourceIncreaseSchema,
  FlowEventRepeatSchema,
} from '../../json-exports';

export function createAjv(options?: Options) {
  const ajv = new Ajv(options);

  const validate = ajv
    .addKeyword('tsEnumNames')
    .addFormat('email', {
      type: 'string',
      validate: (value: string) => isEmail(value),
    })
    .addFormat('dateTimeISO', {
      type: 'string',
      validate: (value: string) => isISO8601(value, { strict: true }),
    })
    .addFormat('apiName', {
      type: 'string',
      validate: (value: string) => {
        const regex = new RegExp(/^[a-z0-9_]*$/);
        return regex.test(value);
      },
    })
    .addSchema(applicationSchema, 'application.schema.json')
    .addSchema(metadataSchema, 'metadata.schema.json')
    .addSchema(viewSchema, 'view.schema.json')
    .addSchema(roleSchema, 'role.schema.json')
    .addSchema(workflowSchema, 'workflow.schema.json')
    .addSchema(flowSchema, 'flow.schema.json')
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
    .addSchema(FlowEventsSchema, 'flow/events.schema.json')
    .addSchema(FlowEventSuccessSchema, 'flow/event/success.schema.json')
    .addSchema(FlowEventFailSchema, 'flow/event/fail.schema.json')
    .addSchema(
      FlowEventSourceQuerySchema,
      'flow/event/source-query.schema.json',
    )
    .addSchema(
      FlowEventSourceCreateSchema,
      'flow/event/source-create.schema.json',
    )
    .addSchema(
      FlowEventSourceUpdateSchema,
      'flow/event/source-update.schema.json',
    )
    .addSchema(
      FlowEventSourceDeleteSchema,
      'flow/event/source-delete.schema.json',
    )
    .addSchema(
      FlowEventSourceAddToManySchema,
      'flow/event/source-add-to-many.schema.json',
    )
    .addSchema(
      FlowEventSourceRemoveFromManySchema,
      'flow/event/source-remove-from-many.schema.json',
    )
    .addSchema(
      FlowEventSourceIncreaseSchema,
      'flow/event/source-increase.schema.json',
    )
    .addSchema(FlowEventChoiceSchema, 'flow/event/choice.schema.json')
    .addSchema(FlowEventRepeatSchema, 'flow/event/repeat.schema.json');

  return validate;
}
