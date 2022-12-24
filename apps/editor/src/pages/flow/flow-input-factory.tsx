import React, { FunctionComponent, useContext, useMemo } from 'react';

import { AtomNameInput } from './input/atom-name-input';
import { SourceQueryInput } from './input/source-query-input';

import { StoreKeyInput } from './input/store-key-input';
import { TemplateInput } from './input/template-input';
import { EventSchema, EventSchemaField } from './interface/event-schema';
import { EventNodeContext } from './nodes/event-node-context';

export interface InputFactoryProps {
  name: string;
  field: EventSchemaField;
  eventSchema: EventSchema;
}

export const InputFactory: FunctionComponent<InputFactoryProps> = ({
  name,
  field,
  eventSchema,
}) => {
  const { editing } = useContext(EventNodeContext);

  const required = useMemo(() => {
    if (!eventSchema.required) {
      return false;
    }
    const requiredSets: string[] = eventSchema.required;
    return requiredSets.includes(name);
  }, [eventSchema.required, name]);

  if (!field.skEditorType) {
    return null;
  }

  if (field.skEditorType === 'StoreKey') {
    return (
      <StoreKeyInput
        name={name}
        label={name}
        required={required}
        editing={editing}
      />
    );
  }

  if (field.skEditorType === 'AtomName') {
    return (
      <AtomNameInput
        name={name}
        label={name}
        required={required}
        editing={editing}
      />
    );
  }

  if (field.skEditorType === 'SourceQuery') {
    return (
      <SourceQueryInput
        name={name}
        label={name}
        required={required}
        editing={editing}
      />
    );
  }

  if (field.skEditorType === 'Template') {
    return (
      <TemplateInput
        name={name}
        label={name}
        required={required}
        editing={editing}
      />
    );
  }

  return null;
};
