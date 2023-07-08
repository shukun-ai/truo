import { Switch } from '@mantine/core';
import {
  booleanSelectDefinition,
  BooleanSelectDefinitionProps,
} from '@shukun/presenter/definition';

import { createWidget } from '../../abstracts/create-widget';
import { extractForm, useFormContext } from '../../shares/form-context';
import { extractBase } from '../../shares/inheritance';

export const BooleanSelectWidget = createWidget<BooleanSelectDefinitionProps>(
  booleanSelectDefinition,
  (props) => {
    const form = useFormContext();

    return (
      <Switch
        {...extractBase(props)}
        {...extractForm(props, form)}
        label={props.label}
        description={props.helper}
        disabled={props.disabled}
        required={props.required}
      />
    );
  },
);
