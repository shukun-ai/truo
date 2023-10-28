import environmentSchemaJson from './json-schemas/application/environment.schema.json';
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
import applicationSchemaJson from './json-schemas/application.schema.json';
import attachmentsSchemaJson from './json-schemas/attachments.schema.json';
import connectorSchemaJson from './json-schemas/connector.schema.json';
import dataSourceSchemaJson from './json-schemas/data-source.schema.json';
import httpQuerySchemaJson from './json-schemas/http-query.schema.json';
import presenterSchemaJson from './json-schemas/presenter.schema.json';
import ReferenceDataSchemaJson from './json-schemas/reference/reference-data.schema.json';
import taskSchemaJson from './json-schemas/task.schema.json';
import widgetSchemaJson from './json-schemas/widget.schema.json';

export const applicationSchema = applicationSchemaJson;
export const metadataSchema = metadataSchemaJson;
export const roleSchema = roleSchemaJson;
export const ruleEngineSchema = ruleEngineSchemaJson;
export const viewSchema = viewSchemaJson;
export const workflowSchema = workflowSchemaJson;
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
export const workflowInputSchema = workflowInputSchemaJson;
export const attachmentsSchema = attachmentsSchemaJson;
export const httpQuerySchema = httpQuerySchemaJson;
export const dataSourceSchema = dataSourceSchemaJson;
export const connectorSchema = connectorSchemaJson;
export const taskSchema = taskSchemaJson;
export const presenterSchema = presenterSchemaJson;
export const widgetSchema = widgetSchemaJson;
export const referenceDataSchema = ReferenceDataSchemaJson;
