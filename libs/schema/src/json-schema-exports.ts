import applicationSchemaJson from './json-schemas/application.schema.json';
import environmentSchemaJson from './json-schemas/application/environment.schema.json';
import flowSchemaJson from './json-schemas/application/flow.schema.json';
import flowEventChoiceSchemaJson from './json-schemas/application/flow/event/choice.schema.json';
import flowEventFailSchemaJson from './json-schemas/application/flow/event/fail.schema.json';
import flowEventFirstOrThrowSchemaJson from './json-schemas/application/flow/event/first-or-throw.schema.json';
import flowEventLastOrThrowSchemaJson from './json-schemas/application/flow/event/last-or-throw.schema.json';
import flowEventParallelSchemaJson from './json-schemas/application/flow/event/parallel.schema.json';
import flowEventRepeatSchemaJson from './json-schemas/application/flow/event/repeat.schema.json';
import flowEventSourceAddToManySchemaJson from './json-schemas/application/flow/event/source-add-to-many.schema.json';
import flowEventSourceCreateSchemaJson from './json-schemas/application/flow/event/source-create.schema.json';
import flowEventSourceDeleteSchemaJson from './json-schemas/application/flow/event/source-delete.schema.json';
import flowEventSourceIncreaseSchemaJson from './json-schemas/application/flow/event/source-increase.schema.json';
import flowEventSourceQuerySchemaJson from './json-schemas/application/flow/event/source-query.schema.json';
import flowEventSourceRemoveFromManySchemaJson from './json-schemas/application/flow/event/source-remove-from-many.schema.json';
import flowEventSourceUpdateSchemaJson from './json-schemas/application/flow/event/source-update.schema.json';
import flowEventStoreSchemaJson from './json-schemas/application/flow/event/store.schema.json';
import flowEventSuccessSchemaJson from './json-schemas/application/flow/event/success.schema.json';
import flowEventsSchemaJson from './json-schemas/application/flow/events.schema.json';
import flowStoreSchemaJson from './json-schemas/application/flow/store.schema.json';
import metadataSchemaJson from './json-schemas/application/metadata.schema.json';
import roleSchemaJson from './json-schemas/application/role.schema.json';
import scheduleSchemaJson from './json-schemas/application/schedule.schema.json';
import ruleEngineSchemaJson from './json-schemas/application/utils/rule-engine.schema.json';
import workflowInputSchemaJson from './json-schemas/application/utils/workflow-input.schema.json';
import viewSchemaJson from './json-schemas/application/view.schema.json';
import workflowSchemaJson from './json-schemas/application/workflow.schema.json';
import workflowCatchesSchemaJson from './json-schemas/application/workflows/catches.schema.json';
import workflowChoiceStateSchemaJson from './json-schemas/application/workflows/choice-state.schema.json';
import workflowChoicesSchemaJson from './json-schemas/application/workflows/choices.schema.json';
import workflowComparisonSchemaJson from './json-schemas/application/workflows/comparison.schema.json';
import workflowConfigurationsSchemaJson from './json-schemas/application/workflows/configurations.schema.json';
import workflowFailStateSchemaJson from './json-schemas/application/workflows/fail-state.schema.json';
import workflowPassStateSchemaJson from './json-schemas/application/workflows/pass-state.schema.json';
import workflowRetriesSchemaJson from './json-schemas/application/workflows/retries.schema.json';
import workflowTaskStateSchemaJson from './json-schemas/application/workflows/task-state.schema.json';
import attachmentsSchemaJson from './json-schemas/attachments.schema.json';
import dataSourceSchemaJson from './json-schemas/data-source.schema.json';
import httpQuerySchemaJson from './json-schemas/http-query.schema.json';
import playerSchemaJson from './json-schemas/player.schema.json';
import playerEventSchemaJson from './json-schemas/player/event.schema.json';
import playerRepositorySchemaJson from './json-schemas/player/repository.schema.json';
import playerWidgetSchemaJson from './json-schemas/player/widget.schema.json';
import widgetSchemaJson from './json-schemas/widget.schema.json';

export const applicationSchema = applicationSchemaJson;
export const metadataSchema = metadataSchemaJson;
export const roleSchema = roleSchemaJson;
export const ruleEngineSchema = ruleEngineSchemaJson;
export const viewSchema = viewSchemaJson;
export const workflowSchema = workflowSchemaJson;
export const flowSchema = flowSchemaJson;
export const scheduleSchema = scheduleSchemaJson;
export const environmentSchema = environmentSchemaJson;
export const workflowCatchesSchema = workflowCatchesSchemaJson;
export const workflowChoiceStateSchema = workflowChoiceStateSchemaJson;
export const workflowChoicesSchema = workflowChoicesSchemaJson;
export const workflowComparisonSchema = workflowComparisonSchemaJson;
export const workflowConfigurationsSchema = workflowConfigurationsSchemaJson;
export const workflowFailStateSchema = workflowFailStateSchemaJson;
export const workflowPassStateSchema = workflowPassStateSchemaJson;
export const workflowRetriesSchema = workflowRetriesSchemaJson;
export const workflowTaskStateSchema = workflowTaskStateSchemaJson;
export const flowEventsSchema = flowEventsSchemaJson;
export const flowStoreSchema = flowStoreSchemaJson;
export const flowEventSuccessSchema = flowEventSuccessSchemaJson;
export const flowEventFailSchema = flowEventFailSchemaJson;
export const flowEventSourceQuerySchema = flowEventSourceQuerySchemaJson;
export const flowEventSourceCreateSchema = flowEventSourceCreateSchemaJson;
export const flowEventSourceUpdateSchema = flowEventSourceUpdateSchemaJson;
export const flowEventSourceDeleteSchema = flowEventSourceDeleteSchemaJson;
export const flowEventSourceAddToManySchema =
  flowEventSourceAddToManySchemaJson;
export const flowEventSourceRemoveFromManySchema =
  flowEventSourceRemoveFromManySchemaJson;
export const flowEventSourceIncreaseSchema = flowEventSourceIncreaseSchemaJson;
export const flowEventChoiceSchema = flowEventChoiceSchemaJson;
export const flowEventRepeatSchema = flowEventRepeatSchemaJson;
export const flowEventParallelSchema = flowEventParallelSchemaJson;
export const flowEventStoreSchema = flowEventStoreSchemaJson;
export const flowEventFirstOrThrowSchema = flowEventFirstOrThrowSchemaJson;
export const flowEventLastOrThrowSchema = flowEventLastOrThrowSchemaJson;
export const workflowInputSchema = workflowInputSchemaJson;
export const attachmentsSchema = attachmentsSchemaJson;
export const httpQuerySchema = httpQuerySchemaJson;
export const dataSourceSchema = dataSourceSchemaJson;
export const playerSchema = playerSchemaJson;
export const playerEventSchema = playerEventSchemaJson;
export const playerRepositorySchema = playerRepositorySchemaJson;
export const playerWidgetSchema = playerWidgetSchemaJson;
export const widgetSchema = widgetSchemaJson;
