import { Switch } from '@mantine/core';
import {
  booleanSelectDefinition,
  BooleanSelectDefinitionProps,
} from '@shukun/widget';

import { createWidget } from '../../abstracts/create-widget';
import { extractBase } from '../../shares/inheritance';

export const BooleanSelectWidget = createWidget<BooleanSelectDefinitionProps>(
  booleanSelectDefinition,
  (props) => {
    return (
      <Switch
        {...extractBase(props)}
        label={props.label}
        description={props.helper}
        checked={props.value}
        disabled={props.disabled}
        required={props.required}
        onChange={(event) => {
          props.change && props.change(event.target.checked);
        }}
      />
    );
  },
);
