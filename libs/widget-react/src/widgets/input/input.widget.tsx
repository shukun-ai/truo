import { TextInput } from '@mantine/core';
import { inputDefinition, InputDefinitionProps } from '@shukun/widget';

import { createWidget } from '../../abstracts/create-widget';

export const InputWidget = createWidget<InputDefinitionProps>(
  inputDefinition,
  (props) => {
    return (
      <TextInput
        label={props.label}
        description={props.helper}
        type={props.type}
        value={props.value}
        placeholder={props.placeholder}
        disabled={props.disabled}
        required={props.required}
        onChange={(event) => props.change && props.change(event.target.value)}
      />
    );
  },
);
