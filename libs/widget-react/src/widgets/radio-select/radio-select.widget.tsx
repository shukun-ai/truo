import { Group, Radio, SelectItem } from '@mantine/core';
import {
  radioSelectDefinition,
  RadioSelectDefinitionProps,
} from '@shukun/widget';
import { useMemo } from 'react';

import { createWidget } from '../../abstracts/create-widget';

export const RadioSelectWidget = createWidget<RadioSelectDefinitionProps>(
  radioSelectDefinition,
  (props) => {
    const options = useMemo<SelectItem[]>(() => {
      if (!props.values) {
        return [];
      }

      return props.values.map((value, index) => ({
        label: props?.labels?.[index] ?? value,
        value,
        selected: value === props.value,
      }));
    }, [props?.labels, props.value, props.values]);

    return (
      <Radio.Group
        label={props.label}
        description={props.helper}
        value={props.value}
        required={props.required}
        onChange={(event) => props.change && props.change(event)}
      >
        <Group mt="xs">
          {options.map((option) => (
            <Radio
              key={option.value}
              value={option.value}
              label={option.label}
              disabled={props.disabled}
            />
          ))}
        </Group>
      </Radio.Group>
    );
  },
);
