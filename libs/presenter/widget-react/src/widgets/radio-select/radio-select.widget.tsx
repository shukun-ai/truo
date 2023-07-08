import { Group, Radio, SelectItem } from '@mantine/core';
import {
  radioSelectDefinition,
  RadioSelectDefinitionProps,
} from '@shukun/widget';
import { useMemo } from 'react';

import { createWidget } from '../../abstracts/create-widget';
import {
  extractForm,
  extractValue,
  useFormContext,
} from '../../shares/form-context';
import { extractBase } from '../../shares/inheritance';

export const RadioSelectWidget = createWidget<RadioSelectDefinitionProps>(
  radioSelectDefinition,
  (props) => {
    const form = useFormContext();

    const options = useMemo<SelectItem[]>(() => {
      const value = extractValue(props, form);
      return props.options.map((option) => ({
        label: option.label,
        value: option.key,
        selected: option.key === value,
      }));
    }, [form, props]);

    return (
      <Radio.Group
        {...extractBase(props)}
        {...extractForm(props, form)}
        label={props.label}
        description={props.helper}
        required={props.required}
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
