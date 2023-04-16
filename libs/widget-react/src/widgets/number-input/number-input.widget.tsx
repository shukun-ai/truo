import { NumberInput } from '@mantine/core';
import {
  numberInputDefinition,
  NumberInputDefinitionProps,
} from '@shukun/widget';

import { createWidget } from '../../abstracts/create-widget';
import { extractForm, useFormContext } from '../../shares/form-context';
import { extractBase } from '../../shares/inheritance';

export const NumberInputWidget = createWidget<NumberInputDefinitionProps>(
  numberInputDefinition,
  (props) => {
    const form = useFormContext();

    return (
      <NumberInput
        {...extractBase(props)}
        {...extractForm(props, form)}
        name={props.name}
        label={props.label}
        description={props.helper}
        placeholder={props.placeholder}
        disabled={props.disabled}
        required={props.required}
      />
    );
  },
);
