import { Select, SelectItem } from '@mantine/core';
import { selectDefinition, SelectDefinitionProps } from '@shukun/widget';
import { useMemo } from 'react';

import { createWidget } from '../../abstracts/create-widget';
import { extractBase } from '../../shares/inheritance';

export const SelectWidget = createWidget<SelectDefinitionProps>(
  selectDefinition,
  (props) => {
    const options = useMemo<SelectItem[]>(() => {
      return props.options.map((value, index) => ({
        label: value.label,
        value: value.key,
        selected: value.key === props.value,
      }));
    }, [props.options, props.value]);

    return (
      <Select
        {...extractBase(props)}
        data={options}
        label={props.label}
        description={props.helper}
        value={props.value}
        placeholder={props.placeholder}
        disabled={props.disabled}
        required={props.required}
        onChange={(event) => props.change && props.change(event)}
      />
    );
  },
);
