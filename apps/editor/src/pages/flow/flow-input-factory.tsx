import React, { FunctionComponent, useContext } from 'react';

import { AtomNameInput } from './input/atom-name-input';
import { SourceQueryInput } from './input/source-query-input';

import { StoreKeyInput } from './input/store-key-input';
import { TemplateInput } from './input/template-input';
import { EventSchemaField } from './interface/event-schema';
import { EventNodeContext } from './nodes/event-node-context';

export interface InputFactoryProps {
  name: string;
  field: EventSchemaField;
}

export const InputFactory: FunctionComponent<InputFactoryProps> = ({
  name,
  field,
}) => {
  const { editing } = useContext(EventNodeContext);

  if (!field.skEditorType) {
    return null;
  }

  if (field.skEditorType === 'StoreKey') {
    return (
      <StoreKeyInput
        name={name}
        label={name}
        required={false}
        editing={editing}
      />
    );
  }

  if (field.skEditorType === 'AtomName') {
    return (
      <AtomNameInput
        name={name}
        label={name}
        required={false}
        editing={editing}
      />
    );
  }

  if (field.skEditorType === 'SourceQuery') {
    return (
      <SourceQueryInput
        name={name}
        label={name}
        required={false}
        editing={editing}
      />
    );
  }

  if (field.skEditorType === 'Template') {
    return (
      <TemplateInput
        name={name}
        label={name}
        required={false}
        editing={editing}
      />
    );
  }

  return null;
};
