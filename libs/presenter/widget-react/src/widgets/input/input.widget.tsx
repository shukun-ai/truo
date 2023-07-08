import { TextInput } from '@mantine/core';
import {
  inputDefinition,
  InputDefinitionProps,
} from '@shukun/presenter/definition';

import { createWidget } from '../../abstracts/create-widget';
import { extractForm, useFormContext } from '../../shares/form-context';
import { extractBase } from '../../shares/inheritance';

export const InputWidget = createWidget<InputDefinitionProps>(
  inputDefinition,
  (props) => {
    const form = useFormContext();

    return (
      <TextInput
        {...extractBase(props)}
        {...extractForm(props, form)}
        name={props.name}
        label={props.label}
        description={props.helper}
        type={props.type}
        placeholder={props.placeholder}
        disabled={props.disabled}
        required={props.required}
      />
    );
  },
);
