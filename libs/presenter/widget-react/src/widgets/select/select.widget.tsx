import { Select, SelectItem } from '@mantine/core';
import {
  selectDefinition,
  SelectDefinitionProps,
} from '@shukun/presenter/definition';
import { useMemo } from 'react';

import { createWidget } from '../../abstracts/create-widget';
import {
  extractForm,
  extractValue,
  useFormContext,
} from '../../shares/form-context';
import { extractBase } from '../../shares/inheritance';

export const SelectWidget = createWidget<SelectDefinitionProps>(
  selectDefinition,
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
      <Select
        {...extractBase(props)}
        {...extractForm(props, form)}
        data={options}
        label={props.label}
        description={props.helper}
        placeholder={props.placeholder}
        disabled={props.disabled}
        required={props.required}
      />
    );
  },
);
