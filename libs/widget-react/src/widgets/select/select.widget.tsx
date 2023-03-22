import { Select, Option } from '@mui/joy';
import { selectDefinition, SelectDefinitionProps } from '@shukun/widget';
import { useMemo } from 'react';

import { createWidget } from '../../abstracts/create-widget';
import { FormControl } from '../../shares/form-control';

export const SelectWidget = createWidget<SelectDefinitionProps>(
  selectDefinition,
  (props) => {
    const options = useMemo<{ label: string; value: string | number }[]>(() => {
      if (!props.values) {
        return [];
      }

      return props.values.map((value, index) => ({
        label: props?.labels?.[index] ?? value,
        value,
      })) as any;
    }, [props?.labels, props?.values]);

    return (
      <FormControl
        label={props.label}
        labelHidden={props.labelHidden}
        labelPosition={props.labelPosition}
        labelWidth={props.labelWidth}
        helper={props.helper}
      >
        <Select
          value={props.value}
          placeholder={props.placeholder}
          disabled={props.disabled}
          onChange={(event, value) => {
            props.change && props.change(value);
          }}
        >
          {options.map((item) => (
            <Option key={item.value} value={item.value}>
              {item.label}
            </Option>
          ))}
        </Select>
      </FormControl>
    );
  },
);
