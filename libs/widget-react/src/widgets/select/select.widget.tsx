import { Select, SelectItem } from '@mantine/core';
import { selectDefinition, SelectDefinitionProps } from '@shukun/widget';
import { useMemo } from 'react';

import { createWidget } from '../../abstracts/create-widget';
import { extractBase } from '../../shares/inheritance';

export const SelectWidget = createWidget<SelectDefinitionProps>(
  selectDefinition,
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
