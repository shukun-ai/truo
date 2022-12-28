export interface EventSchema {
  $schema?: string;
  type: 'object';
  required?: string[];
  properties: Record<string, EventSchemaField>;
}

export interface EventSchemaField {
  skEditorType?: EventSchemaEditorType;
}

export type EventSchemaEditorType =
  | 'StoreKey'
  | 'Template'
  | 'AtomName'
  | 'SourceQuery'
  | 'Next'
  | 'EventName'
  | 'Description'
  | 'ChoiceConditions'
  | 'ParallelBranches';
