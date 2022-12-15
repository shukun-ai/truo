/* eslint-disable */
/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type MetadataOptions = {
  key: string;
  label: string;
  color?: string;
}[];
/**
 * It only work on SingleSelect and MultipleSelect now.
 */
export type ViewV2ColumnFilterOptions = string[];
/**
 * It only work on SingleSelect and MultipleSelect now.
 */
export type ViewV2FieldFilterOptions = string[];
export type WorkflowTaskState = {
  type: 'Task';
  comment?: string;
  end?: boolean;
  next?: string;
  inputPath?: string;
  resultSelector?: {
    [k: string]: unknown;
  };
  resultPath?: string;
  outputPath?: string;
  retry?: WorkflowRetries;
  catch?: WorkflowCatches;
  timeoutSeconds?: number;
  timeoutSecondsPath?: string;
  heartbeatSeconds?: number;
  heartbeatSecondsPath?: string;
  x?: number;
  y?: number;
  [k: string]: unknown;
} & (
  | TaskStateSourceCreateOne
  | TaskStateSourceUpdateOne
  | TaskStateSourceFindOne
  | TaskStateSourceFindAll
  | TaskStateSourceCount
  | TaskStateSourceDeleteOne
  | TaskStateSourceAddToMany
  | TaskStateSourceRemoveFromMany
  | TaskStateSourceIncrease
  | TaskStateSourceDecrease
  | TaskStateHttp
  | TaskStateWorkflow
  | TaskStateWorkflowMap
  | TaskStatePassport
  | TaskStateCode
);
export type WorkflowRetries = {
  errorEquals?: string[];
  intervalSeconds?: number;
  maxAttempts?: number;
  backoffRate?: number;
}[];
export type WorkflowCatches = {
  errorEquals?: string[];
  next?: string;
}[];
export type WorkflowChoices = (WorkflowComparison & {
  next: string;
  [k: string]: unknown;
})[];
/**
 * This interface was referenced by `FlowEvents`'s JSON-Schema definition
 * via the `patternProperty` "^(\w)+$".
 */
export type FlowEvent =
  | FlowEventSuccess
  | FlowEventFail
  | FlowEventSourceQuery
  | FlowEventSourceCreate
  | FlowEventSourceUpdate
  | FlowEventSourceDelete
  | FlowEventSourceAddToMany
  | FlowEventSourceRemoveFromMany
  | FlowEventSourceIncrease
  | FlowEventChoice
  | FlowEventRepeat
  | FlowEventParallel
  | FlowEventStore
  | FlowEventFirstOrThrow
  | FlowEventLastOrThrow;
export type RoleAttribute = string;

/**
 * Describe a Shukun Application
 */
export interface ApplicationSchema {
  $schema?: string;
  title: string;
  description?: string;
  metadata?: MetadataSchema[];
  views?: ViewSchema[];
  workflows?: WorkflowSchema[];
  flows?: FlowSchema[];
  roles?: RoleSchema[];
}
/**
 * Metadata management
 */
export interface MetadataSchema {
  $schema?: string;
  name: string;
  label: string;
  description?: string;
  electrons: MetadataElectron[];
}
export interface MetadataElectron {
  name: string;
  label: string;
  fieldType: MetadataFieldType;
  isRequired: boolean;
  referenceTo?: string;
  foreignName?: string;
  isUnique?: boolean;
  isIndexed?: boolean;
  description?: string;
  precision?: number;
  scale?: number;
  defaultValue?: unknown;
  isNegative?: boolean;
  minLength?: number;
  maxLength?: number;
  options?: MetadataOptions;
  passwordOptions?: MetadataPasswordOptions;
  currencyOptions?: MetadataCurrencyOptions;
  attachmentOptions?: MetadataAttachmentOptions;
}
export interface MetadataPasswordOptions {
  requireNumber?: number;
  requireCharacter?: boolean;
  requireUppercase?: boolean;
  requireLowercase?: boolean;
}
export interface MetadataCurrencyOptions {
  code?: string;
  scale?: number;
}
export interface MetadataAttachmentOptions {
  allowedMime?: string[];
  limitSize?: number;
  limitUpload?: number;
}
/**
 * Describe View Schema
 */
export interface ViewSchema {
  $schema?: string;
  name: string;
  label: string;
  description?: string;
  type: ViewType;
  isSystem?: boolean;
  atomName?: string;
  configurations?: ViewConfigurations;
  value?: string;
  parentName?: string;
  isVisible: boolean;
  priority: number;
  search?: ViewSearch;
}
export interface ViewConfigurations {
  v2Columns?: ViewV2Column[];
  v2ColumnRibbons?: ViewV2Ribbon[];
  v2CustomActions?: ViewV2CustomAction[];
  v2Fields?: ViewV2Field[];
  v2FieldGroups?: ViewV2FieldGroup[];
  v2FieldRibbons?: ViewV2Ribbon[];
  columns?: ViewColumn[];
  form?: {
    [k: string]: ViewFormItem;
  };
  tree?: ViewTree;
  detailCustomActions?: ViewDetailCustomAction[];
  detailEditAction?: ViewDetailEditAction;
  detailRemoveAction?: ViewDetailRemoveAction;
}
export interface ViewV2Column {
  name: string;
  label: string;
  type: ViewV2FieldType;
  electronName: string;
  referenceViewName?: string;
  computedCode?: string;
  link?: {
    type: ViewV2LinkType;
    value?: string;
    query?: string;
  };
  filterHidden?: boolean;
  filterOptions?: ViewV2ColumnFilterOptions;
  filterType?: ViewV2ColumnFilterType;
}
export interface ViewV2Ribbon {
  name: string;
  label: string;
  type: ViewV2LinkType;
  value?: string;
  query?: string;
  disabledCode?: string;
  disabledTip?: string;
  confirmedTip?: string;
  color?: string;
}
export interface ViewV2CustomAction {
  name: string;
  label: string;
  type: ViewV2CustomActionType;
  value?: string;
}
export interface ViewV2Field {
  name: string;
  label: string;
  type: ViewV2FieldType;
  electronName: string;
  referenceViewName?: string;
  tip?: string;
  requiredCode?: string;
  disabledCode?: string;
  oneToMany?: {
    atomName?: string;
    foreignName?: string;
  };
  belongToGroup?: string;
  filterOptions?: ViewV2FieldFilterOptions;
}
export interface ViewV2FieldGroup {
  name: string;
  label: string;
  type: ViewV2FieldGroupType;
  value?: string;
}
export interface ViewColumn {
  electronName: string;
  allowSort?: boolean;
  allowSearch?: boolean;
  showColumn?: boolean;
}
/**
 * This interface was referenced by `undefined`'s JSON-Schema definition
 * via the `patternProperty` "^(\w)+$".
 */
export interface ViewFormItem {
  hidden?: RuleEngineSet;
  required?: RuleEngineSet;
  disabled?: RuleEngineSet;
  priority?: number;
}
/**
 * Describe Rule Engine
 */
export interface RuleEngineSet {
  globalCondition?: RuleEngineGlobalCondition;
  conditions?: {
    sourceMethod: RuleEngineSourceMethod;
    sourceParam: unknown;
    operator: RuleEngineOperator;
    targetMethod?: RuleEngineTargetMethod;
    targetParam?: unknown;
  }[];
}
export interface ViewTree {
  parentElectronName?: string;
  labelElectronName?: string;
}
export interface ViewDetailCustomAction {
  key: string;
  label: string;
  type: ViewDetailCustomActionType;
  value?: string;
  query?: string;
  disabled?: RuleEngineSet;
  disabledTip?: string;
  confirmed?: boolean;
  confirmedTip?: string;
  hidden?: RuleEngineSet;
}
export interface ViewDetailEditAction {
  disabled?: RuleEngineSet;
  disabledTip?: string;
  confirmed?: boolean;
  confirmedTip?: string;
  hidden?: RuleEngineSet;
}
export interface ViewDetailRemoveAction {
  disabled?: RuleEngineSet;
  disabledTip?: string;
  confirmed?: boolean;
  confirmedTip?: string;
  hidden?: RuleEngineSet;
}
/**
 * Support sub keywords: filter, sort. But didn't support totalCount, currentPage, pageSize.
 */
export interface ViewSearch {
  totalCount?: number;
  currentPage?: number;
  pageSize?: number;
  filter?: {
    /**
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^(\w)+$".
     */
    [k: string]: {
      $eq?: string | number | boolean;
      $ne?: string | number | boolean;
      $gt?: string | number | boolean;
      $gte?: string | number | boolean;
      $lt?: string | number | boolean;
      $lte?: string | number | boolean;
      $in?: (string | number | boolean)[];
      $nin?: (string | number | boolean)[];
      $like?: string;
      [k: string]: unknown;
    };
  };
  sort?: {
    /**
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^(\w)+$".
     */
    [k: string]: 'asc' | 'desc';
  };
  [k: string]: unknown;
}
/**
 * Describe Workflow Schema
 */
export interface WorkflowSchema {
  $schema?: string;
  name: string;
  description?: string;
  isEnabledWebhook?: boolean;
  validations?: unknown;
  configurations?: WorkflowConfigurations;
}
export interface WorkflowConfigurations {
  startAt: string;
  comments?: string;
  version?: string;
  timeoutSeconds?: number;
  startX?: number;
  startY?: number;
  endX?: number;
  endY?: number;
  states: WorkflowState;
}
export interface WorkflowState {
  /**
   * This interface was referenced by `WorkflowState`'s JSON-Schema definition
   * via the `patternProperty` "^(\w)+$".
   */
  [k: string]:
    | WorkflowPassState
    | WorkflowTaskState
    | WorkflowChoiceState
    | WorkflowFailState;
}
export interface WorkflowPassState {
  type: 'Pass';
  comment?: string;
  end?: boolean;
  next?: string;
  inputPath?: string;
  parameters?: {
    [k: string]: unknown;
  };
  resultSelector?: {
    [k: string]: unknown;
  };
  resultPath?: string;
  outputPath?: string;
  result?: {
    [k: string]: unknown;
  };
  x?: number;
  y?: number;
  [k: string]: unknown;
}
export interface TaskStateSourceCreateOne {
  resource: 'source:createOne';
  parameters: {
    atomName?: string;
    'atomName.$'?: string;
    data?: {
      [k: string]: unknown;
    };
  };
  [k: string]: unknown;
}
export interface TaskStateSourceUpdateOne {
  resource: 'source:updateOne';
  parameters: {
    id?: string;
    atomName?: string;
    data?: {
      [k: string]: unknown;
    };
    'id.$'?: string;
    'atomName.$'?: string;
  };
  [k: string]: unknown;
}
export interface TaskStateSourceFindOne {
  resource: 'source:findOne';
  parameters: {
    atomName?: string;
    query?: {
      [k: string]: unknown;
    };
    'atomName.$'?: string;
  };
  [k: string]: unknown;
}
export interface TaskStateSourceFindAll {
  resource: 'source:findAll';
  parameters: {
    atomName?: string;
    query?: {
      [k: string]: unknown;
    };
    'atomName.$'?: string;
  };
  [k: string]: unknown;
}
export interface TaskStateSourceCount {
  resource: 'source:count';
  parameters: {
    atomName?: string;
    query?: {
      [k: string]: unknown;
    };
    'atomName.$'?: string;
  };
  [k: string]: unknown;
}
export interface TaskStateSourceDeleteOne {
  resource: 'source:deleteOne';
  parameters: {
    atomName?: string;
    query?: {
      [k: string]: unknown;
    };
    'atomName.$'?: string;
  };
  [k: string]: unknown;
}
export interface TaskStateSourceAddToMany {
  resource: 'source:addToMany';
  parameters: {
    id?: string;
    atomName?: string;
    electronName?: string;
    foreignId?: string;
    'id.$'?: string;
    'atomName.$'?: string;
    'electronName.$'?: string;
    'foreignId.$'?: string;
  };
  [k: string]: unknown;
}
export interface TaskStateSourceRemoveFromMany {
  resource: 'source:removeFromMany';
  parameters: {
    id?: string;
    atomName?: string;
    electronName?: string;
    foreignId?: string;
    'id.$'?: string;
    'atomName.$'?: string;
    'electronName.$'?: string;
    'foreignId.$'?: string;
  };
  [k: string]: unknown;
}
export interface TaskStateSourceIncrease {
  resource: 'source:increase';
  parameters: {
    id?: string;
    atomName?: string;
    electronName?: string;
    increment?: number;
    'id.$'?: string;
    'atomName.$'?: string;
    'electronName.$'?: string;
    'increment.$'?: string;
  };
  [k: string]: unknown;
}
export interface TaskStateSourceDecrease {
  resource: 'source:decrease';
  parameters: {
    id?: string;
    atomName?: string;
    electronName?: string;
    increment?: number;
    'id.$'?: string;
    'atomName.$'?: string;
    'electronName.$'?: string;
    'increment.$'?: string;
  };
  [k: string]: unknown;
}
export interface TaskStateHttp {
  resource: 'http';
  parameters: {
    url?: string;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    headers?: {
      [k: string]: unknown;
    };
    query?: {
      [k: string]: unknown;
    };
    data?: {
      [k: string]: unknown;
    };
    'url.$'?: string;
    'method.$'?: string;
    'headers.$'?: string;
    'query.$'?: string;
    'data.$'?: string;
  };
  [k: string]: unknown;
}
export interface TaskStateWorkflow {
  resource: 'workflow';
  parameters: {
    workflowName?: string;
    body?: {
      [k: string]: unknown;
    };
    headers?: {
      [k: string]: unknown;
    };
    'workflowName.$'?: string;
    'body.$'?: string;
    'headers.$'?: string;
  };
  [k: string]: unknown;
}
export interface TaskStateWorkflowMap {
  resource: 'workflow:map';
  parameters: {
    workflowName?: string;
    items?: unknown[];
    body?: {
      [k: string]: unknown;
    };
    headers?: {
      [k: string]: unknown;
    };
    'workflowName.$'?: string;
    'items.$'?: string;
    'body.$'?: string;
    'headers.$'?: string;
    [k: string]: unknown;
  };
  [k: string]: unknown;
}
export interface TaskStatePassport {
  resource: 'passport:jwt';
  parameters: {
    userId?: string;
    expiresIn?: number;
    'userId.$'?: string;
    'expiresIn.$'?: string;
  };
  [k: string]: unknown;
}
export interface TaskStateCode {
  resource: 'code:js';
  parameters: {
    code: string;
    [k: string]: unknown;
  };
  [k: string]: unknown;
}
export interface WorkflowChoiceState {
  type: 'Choice';
  comment?: string;
  inputPath?: string;
  outputPath?: string;
  choices: WorkflowChoices;
  default?: string;
  x?: number;
  y?: number;
  [k: string]: unknown;
}
export interface WorkflowComparison {
  and?: WorkflowComparison[];
  or?: WorkflowComparison[];
  not?: WorkflowComparison;
  variable?: string;
  booleanEquals?: boolean;
  booleanEqualsPath?: string;
  isBoolean?: boolean;
  isNull?: boolean;
  isNumeric?: boolean;
  isPresent?: boolean;
  isString?: boolean;
  isTimestamp?: boolean;
  numericEquals?: number;
  numericEqualsPath?: string;
  numericGreaterThan?: number;
  numericGreaterThanPath?: string;
  numericGreaterThanEquals?: number;
  numericGreaterThanEqualsPath?: string;
  numericLessThan?: number;
  numericLessThanPath?: string;
  numericLessThanEquals?: number;
  numericLessThanEqualsPath?: string;
  stringEquals?: string;
  stringEqualsPath?: string;
  stringGreaterThan?: string;
  stringGreaterThanPath?: string;
  stringGreaterThanEquals?: string;
  stringGreaterThanEqualsPath?: string;
  stringLessThan?: string;
  stringLessThanPath?: string;
  stringLessThanEquals?: string;
  stringLessThanEqualsPath?: string;
  stringMatches?: string;
  timestampEquals?: string;
  timestampEqualsPath?: string;
  timestampGreaterThan?: string;
  timestampGreaterThanPath?: string;
  timestampGreaterThanEquals?: string;
  timestampGreaterThanEqualsPath?: string;
  timestampLessThan?: string;
  timestampLessThanPath?: string;
  timestampLessThanEquals?: string;
  timestampLessThanEqualsPath?: string;
  [k: string]: unknown;
}
export interface WorkflowFailState {
  type: 'Fail';
  error: string;
  cause: string;
  x?: number;
  y?: number;
  [k: string]: unknown;
}
/**
 * Describe Flow Schema
 */
export interface FlowSchema {
  $schema?: string;
  name: string;
  description?: string;
  /**
   * The input JSON Schema Rule
   */
  input: {
    [k: string]: unknown;
  };
  /**
   * The output JSON Schema Rule
   */
  output: {
    [k: string]: unknown;
  };
  startEventName: string;
  events: FlowEvents;
}
export interface FlowEvents {
  [k: string]: FlowEvent;
}
export interface FlowEventSuccess {
  type: 'Success';
  output: string;
  [k: string]: unknown;
}
export interface FlowEventFail {
  type: 'Fail';
  output: string;
  [k: string]: unknown;
}
export interface FlowEventSourceQuery {
  type: 'SourceQuery';
  next: string;
  atomName: string;
  query: {
    filter?: FlowEventSourceQueryFilter;
    select?: {
      /**
       * The style is like MongoDB.
       *
       * This interface was referenced by `undefined`'s JSON-Schema definition
       * via the `patternProperty` "^(\w)+$".
       */
      [k: string]: boolean;
    };
    sort?: {
      /**
       * The style is like MongoDB.
       *
       * This interface was referenced by `undefined`'s JSON-Schema definition
       * via the `patternProperty` "^(\w)+$".
       */
      [k: string]: 'asc' | 'desc';
    };
    limit?: number;
    skip?: number;
    count?: boolean;
  };
  [k: string]: unknown;
}
export interface FlowEventSourceQueryFilter {
  [k: string]: FlowEventSourceQueryFilterExpression;
}
/**
 * This interface was referenced by `FlowEventSourceQueryFilter`'s JSON-Schema definition
 * via the `patternProperty` "^(\w)+$".
 */
export interface FlowEventSourceQueryFilterExpression {
  $eq?: string;
  $ne?: string;
  $gt?: string;
  $gte?: string;
  $lt?: string;
  $lte?: string;
  $in?: string;
  $nin?: string;
  $and?: FlowEventSourceQueryFilter[];
  $or?: FlowEventSourceQueryFilter[];
  $foreign?: FlowEventSourceQueryFilter;
  $like?: string;
}
export interface FlowEventSourceCreate {
  type: 'SourceCreate';
  next: string;
  atomName: string;
  data: {
    [k: string]: unknown;
  };
  [k: string]: unknown;
}
export interface FlowEventSourceUpdate {
  type: 'SourceUpdate';
  next: string;
  atomName: string;
  id: string;
  data: {
    [k: string]: unknown;
  };
  [k: string]: unknown;
}
export interface FlowEventSourceDelete {
  type: 'SourceDelete';
  next: string;
  atomName: string;
  id: string;
  [k: string]: unknown;
}
export interface FlowEventSourceAddToMany {
  type: 'SourceAddToMany';
  next: string;
  atomName: string;
  id: string;
  electronName: string;
  foreignId: string;
  [k: string]: unknown;
}
export interface FlowEventSourceRemoveFromMany {
  type: 'SourceRemoveFromMany';
  next: string;
  atomName: string;
  id: string;
  electronName: string;
  foreignId: string;
  [k: string]: unknown;
}
export interface FlowEventSourceIncrease {
  type: 'SourceIncrease';
  next: string;
  atomName: string;
  id: string;
  electronName: string;
  increment: string;
  [k: string]: unknown;
}
export interface FlowEventChoice {
  type: 'Choice';
  /**
   * it means default next.
   */
  next: string;
  conditions: {
    description?: string;
    condition: string;
    next: string;
  }[];
  [k: string]: unknown;
}
export interface FlowEventRepeat {
  type: 'Repeat';
  next: string;
  repeatCount: string;
  startEventName: string;
  events: FlowEvents;
  description?: string;
  [k: string]: unknown;
}
export interface FlowEventParallel {
  type: 'Parallel';
  next: string;
  branches: {
    startEventName: string;
    events: FlowEvents;
    description?: string;
  }[];
  [k: string]: unknown;
}
export interface FlowEventStore {
  type: 'Store';
  next: string;
  key: string;
  value: string;
  [k: string]: unknown;
}
export interface FlowEventFirstOrThrow {
  type: 'FirstOrThrow';
  next: string;
  [k: string]: unknown;
}
export interface FlowEventLastOrThrow {
  type: 'LastOrThrow';
  next: string;
  [k: string]: unknown;
}
/**
 * Describe Role Schema
 */
export interface RoleSchema {
  $schema?: string;
  name: string;
  label: string;
  description?: string;
  isSystem?: boolean;
  permissions: RolePermission[];
}
export interface RolePermission {
  resourceType: RoleResourceType;
  resourceName: string;
  action: RoleAction;
  attributes: RoleAttribute[];
}

export enum MetadataFieldType {
  Text = 'Text',
  NameText = 'NameText',
  LargeText = 'LargeText',
  SingleSelect = 'SingleSelect',
  MultiSelect = 'MultiSelect',
  Boolean = 'Boolean',
  DateTime = 'DateTime',
  Integer = 'Integer',
  Float = 'Float',
  Currency = 'Currency',
  Password = 'Password',
  ManyToMany = 'ManyToMany',
  ManyToOne = 'ManyToOne',
  Owner = 'Owner',
  Attachment = 'Attachment',
  Mixed = 'Mixed',
  Role = 'Role',
}
export enum ViewType {
  Simple = 'Simple',
  Tree = 'Tree',
  Calendar = 'Calendar',
  Gallery = 'Gallery',
  Custom = 'Custom',
  External = 'External',
  Link = 'Link',
  Menu = 'Menu',
}
export enum ViewV2FieldType {
  Text = 'Text',
  NameText = 'NameText',
  LargeText = 'LargeText',
  SingleSelect = 'SingleSelect',
  MultiSelect = 'MultiSelect',
  Boolean = 'Boolean',
  DateTime = 'DateTime',
  Integer = 'Integer',
  Float = 'Float',
  Currency = 'Currency',
  Password = 'Password',
  ManyToMany = 'ManyToMany',
  ManyToOne = 'ManyToOne',
  Owner = 'Owner',
  Attachment = 'Attachment',
  Mixed = 'Mixed',
  Role = 'Role',
  OneToMany = 'OneToMany',
  LinkText = 'LinkText',
}
/**
 * Support CreateOne, Excel, Csv, View, CustomModal in Table. Support UpdateOne, DeleteOne, Print, View in Detail.
 */
export enum ViewV2LinkType {
  None = 'None',
  View = 'View',
  Webhook = 'Webhook',
  CreateOne = 'CreateOne',
  ReadOne = 'ReadOne',
  UpdateOne = 'UpdateOne',
  DeleteOne = 'DeleteOne',
  Print = 'Print',
  Excel = 'Excel',
  Csv = 'Csv',
  CustomModal = 'CustomModal',
}
export enum ViewV2ColumnFilterType {
  SelectRadio = 'SelectRadio',
}
export enum ViewV2CustomActionType {
  Column = 'Column',
}
export enum ViewV2FieldGroupType {
  None = 'None',
  CustomTab = 'CustomTab',
}
export enum RuleEngineGlobalCondition {
  always = 'always',
  none = 'none',
  every = 'every',
  some = 'some',
}
export enum RuleEngineSourceMethod {
  getField = 'getField',
  getFixed = 'getFixed',
  getFieldOptions = 'getFieldOptions',
}
export enum RuleEngineOperator {
  equal = 'equal',
  notEqual = 'notEqual',
  in = 'in',
  notIn = 'notIn',
  lessThan = 'lessThan',
  lessThanInclusive = 'lessThanInclusive',
  greaterThan = 'greaterThan',
  greaterThanInclusive = 'greaterThanInclusive',
  isTrue = 'isTrue',
}
export enum RuleEngineTargetMethod {
  getField = 'getField',
  getFixed = 'getFixed',
  getFieldOptions = 'getFieldOptions',
}
export enum ViewDetailCustomActionType {
  None = 'None',
  View = 'View',
  Webhook = 'Webhook',
}
export enum RoleResourceType {
  Public = 'public',
  Internal = 'internal',
  Source = 'source',
  View = 'view',
  Webhook = 'webhook',
  Developer = 'developer',
  Tenant = 'tenant',
}
export enum RoleAction {
  ReadAny = 'read:any',
  CreateAny = 'create:any',
  UpdateAny = 'update:any',
  DeleteAny = 'delete:any',
  ReadOwn = 'read:own',
  UpdateOwn = 'update:own',
  DeleteOwn = 'delete:own',
}
