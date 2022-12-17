export interface EventSchema {
  $schema?: string;
  type: 'object';
  required?: ['type', 'next', 'key', 'value'];
  properties: Record<string, EventSchemaField>;
}

export interface EventSchemaField {
  skEditorType?: EventSchemaEditorType;
}

export type EventSchemaEditorType =
  | 'StoreKey'
  | 'Template'
  | 'AtomName'
  | 'SourceQuery';
