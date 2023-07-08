import { Checkbox, Group, SelectItem } from '@mantine/core';
import {
  checkboxSelectDefinition,
  CheckboxSelectDefinitionProps,
} from '@shukun/presenter/definition';
import { useMemo } from 'react';

import { createWidget } from '../../abstracts/create-widget';
import {
  extractForm,
  extractValue,
  useFormContext,
} from '../../shares/form-context';
import { extractBase } from '../../shares/inheritance';

export const CheckboxSelectWidget = createWidget<CheckboxSelectDefinitionProps>(
  checkboxSelectDefinition,
  (props) => {
    const form = useFormContext();

    const options = useMemo<SelectItem[]>(() => {
      const value = extractValue(props, form);
      return props.options.map((option) => ({
        label: option.label,
        value: option.key,
        selected:
          value && Array.isArray(value) ? value.includes(option.key) : false,
      }));
    }, [form, props]);

    return (
      <Checkbox.Group
        {...extractBase(props)}
        {...extractForm(props, form)}
        label={props.label}
        description={props.helper}
        required={props.required}
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
