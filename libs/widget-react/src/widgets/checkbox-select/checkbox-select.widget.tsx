import { Checkbox, Group, SelectItem } from '@mantine/core';
import {
  checkboxSelectDefinition,
  CheckboxSelectDefinitionProps,
} from '@shukun/widget';
import { useMemo } from 'react';

import { createWidget } from '../../abstracts/create-widget';
import { extractBase } from '../../shares/inheritance';

export const CheckboxSelectWidget = createWidget<CheckboxSelectDefinitionProps>(
  checkboxSelectDefinition,
  (props) => {
    const options = useMemo<SelectItem[]>(() => {
      return props.options.map((value) => ({
        label: value.label,
        value: value.key,
        selected: props.value ? props.value.includes(value.key) : false,
      }));
    }, [props.options, props.value]);

    return (
      <Checkbox.Group
        {...extractBase(props)}
        label={props.label}
        description={props.helper}
        value={props.value}
        required={props.required}
        onChange={(event) => props.change && props.change(event)}
      >
        <Group mt="xs">
          {options.map((option) => (
            <Checkbox
              key={option.value}
              value={option.value}
              label={option.label}
              disabled={props.disabled}
            />
          ))}
        </Group>
      </Checkbox.Group>
    );
  },
);
