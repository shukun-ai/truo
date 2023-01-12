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
export type ViewTableFilterOptions = string[];
/**
 * It only work on SingleSelect and MultipleSelect now.
 */
export type ViewFieldFilterOptions = string[];
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
  schedules?: ScheduleSchema[];
  environments?: EnvironmentSchema[];
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
  referenceTo?: string;
  foreignName?: string;
  description?: string;
  /**
   * It will be effect in Schema builder and Input Validate.
   */
  isRequired: boolean;
  /**
   * It will be effect in Schema builder and Input Validate. If the isUnique is set as true, the electron should be set as isRequired and isIndex.
   */
  isUnique?: boolean;
  /**
   * It will be effect in Schema builder and Input Validate.
   */
  isIndexed?: boolean;
  /**
   * It will be effect in Schema builder and Input Validate. This field is only apply for Float type, and the float default is 8.
   */
  precision?: number;
  /**
   * I will be effect in Schema builder and Input Validate. This field is only apply for Float type, and the float default is 2.
   */
  scale?: number;
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
  minLength?: number;
  maxLength?: number;
}
/**
 * More Currency ISO Reference: https://en.wikipedia.org/wiki/ISO_4217, the data precision will be set as 15 and scale will be set as 4.
 */
export interface MetadataCurrencyOptions {
  /**
   * The code is from ISO 4217.
   */
  code?: string;
  /**
   * This electron.currencyOptions.scale value is different with electron.scale, the scale is just used for Front-end format.
   */
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
  tableFields?: ViewTableField[];
  tableRibbons?: ViewRibbon[];
  tableCustomActions?: ViewCustomAction[];
  detailFields?: ViewDetailField[];
  detailGroups?: ViewDetailGroup[];
  detailRibbons?: ViewRibbon[];
}
export interface ViewTableField {
  name: string;
  label: string;
  type: ViewFieldType;
  electronName: string;
  referenceViewName?: string;
  computedCode?: string;
  link?: {
    type: ViewLinkType;
    value?: string;
    query?: string;
  };
  filterHidden?: boolean;
  filterOptions?: ViewTableFilterOptions;
  filterType?: ViewTableFilterType;
}
export interface ViewRibbon {
  name: string;
  label: string;
  type: ViewLinkType;
  value?: string;
  query?: string;
  disabledCode?: string;
  disabledTip?: string;
  confirmedTip?: string;
  color?: string;
}
export interface ViewCustomAction {
  name: string;
  label: string;
  type: ViewCustomActionType;
  value?: string;
}
export interface ViewDetailField {
  name: string;
  label: string;
  type: ViewFieldType;
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
  filterOptions?: ViewFieldFilterOptions;
}
export interface ViewDetailGroup {
  name: string;
  label: string;
  type: ViewDetailGroupType;
  value?: string;
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
  store: FlowStore;
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
    /**
     * The filter should be validate by custom program.
     */
    filter?: {
      [k: string]: unknown;
    };
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
  description?: string;
  [k: string]: unknown;
}
export interface FlowEventParallel {
  type: 'Parallel';
  next: string;
  branches: {
    startEventName: string;
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
export interface FlowStore {
  /**
   * This interface was referenced by `FlowStore`'s JSON-Schema definition
   * via the `patternProperty` "^(\w)+$".
   */
  [k: string]:
    | FlowStoreStringType
    | FlowStoreNumberType
    | FlowStoreBooleanType
    | FlowStoreObjectType
    | FlowStoreAtomsType
    | FlowStoreAtomType;
}
export interface FlowStoreStringType {
  type: 'string';
  [k: string]: unknown;
}
export interface FlowStoreNumberType {
  type: 'number';
  [k: string]: unknown;
}
export interface FlowStoreBooleanType {
  type: 'boolean';
  [k: string]: unknown;
}
export interface FlowStoreObjectType {
  type: 'object';
  validateObject: unknown;
  [k: string]: unknown;
}
export interface FlowStoreAtomsType {
  type: 'atoms';
  atomName: string;
  [k: string]: unknown;
}
export interface FlowStoreAtomType {
  type: 'atom';
  atomName: string;
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
/**
 * Describe Schedule Schema
 */
export interface ScheduleSchema {
  $schema?: string;
  name: string;
  description?: string;
  /**
   * The name of a flow.
   */
  flow: string;
  /**
   * The cron syntax, like: https://crontab.guru/ or https://cronjob.xyz.
   */
  cron: string;
  /**
   * The all available timezone: https://momentjs.com/timezone/.
   */
  timezone: string;
  /**
   * The active schedule will be run.
   */
  active: boolean;
  /**
   * The input data for flow.
   */
  input?: {
    [k: string]: unknown;
  };
}
/**
 * Describe Environment Schema
 */
export interface EnvironmentSchema {
  $schema?: string;
  name: string;
  description?: string;
  value: string;
  isPublic: boolean;
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
export enum ViewFieldType {
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
export enum ViewLinkType {
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
export enum ViewTableFilterType {
  SelectRadio = 'SelectRadio',
}
export enum ViewCustomActionType {
  Column = 'Column',
}
export enum ViewDetailGroupType {
  None = 'None',
  CustomTab = 'CustomTab',
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
