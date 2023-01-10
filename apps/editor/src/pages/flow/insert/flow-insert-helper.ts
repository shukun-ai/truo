import { TypeException } from '@shukun/exception';
import { FlowEvent } from '@shukun/schema';

import { EventSchema, EventSchemaEditorType } from '../interface/event-schema';

export const eventTypes: NonNullable<FlowEvent['type']>[] = [
  'Success',
  'Fail',
  'SourceQuery',
  'SourceCreate',
  'SourceUpdate',
  'SourceDelete',
  'SourceAddToMany',
  'SourceRemoveFromMany',
  'SourceIncrease',
  'Choice',
  'Repeat',
  'Parallel',
  'Store',
  'FirstOrThrow',
  'LastOrThrow',
];

export function createEventDefaultValue(
  eventType: FlowEvent['type'],
  eventSchema: EventSchema,
): FlowEvent {
  const requiredSets = eventSchema.required ?? [];
  const eventDefaultValue: any = {};

  for (const [fieldName, field] of Object.entries(eventSchema.properties)) {
    if (requiredSets.includes(fieldName) && field.skEditorType) {
      eventDefaultValue[fieldName] = createFieldDefaultValue(
        field.skEditorType,
      );
    }
  }

  return {
    ...eventDefaultValue,
    type: eventType,
  };
}

export function createFieldDefaultValue(skEditorType: EventSchemaEditorType) {
  switch (skEditorType) {
    case 'StoreKey':
      return '';
    case 'Template':
      return '';
    case 'AtomName':
      return '';
    case 'SourceQuery':
      return {};
    case 'Next':
      return '';
    case 'EventName':
      return '';
    case 'Description':
      return '';
    case 'ChoiceConditions':
      return [];
    case 'ParallelBranches':
      return [];
    default:
      throw new TypeException(
        'Did not find this skEditorType: {{skEditorType}}',
        { skEditorType },
      );
  }
}
