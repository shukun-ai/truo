import { ExtractFormItem, ExtractFormItemProps } from '@shukun/component';
import { LegacyFunctionComponent } from '@shukun/component';
import { MetadataOptions } from '@shukun/schema';
import { Form, Select, SelectProps } from 'antd';
import React, { FunctionComponent, useCallback, useMemo } from 'react';

import { FilterFieldProps } from '../interfaces';

export type SingleSelectFilterInputValue = { $in?: string[] };

export const SingleSelectFilter: LegacyFunctionComponent<FilterFieldProps> = ({
  label,
  electronName,
  electronOptions,
  tip,
  filterOptions,
}) => {
  const options = useMemo(() => {
    return electronOptions?.filter(
      (item) => filterOptions?.includes(item.key) ?? true,
    );
  }, [electronOptions, filterOptions]);

  return (
    <Form.Item label={label} name={electronName} tooltip={tip}>
      <ExtractFormItem<SingleSelectFilterInputValue>>
        {({ value, onChange, id }) => (
          <SingleSelectFilterInput
            id={id}
            value={value}
            onChange={onChange}
            options={options ?? []}
          />
        )}
      </ExtractFormItem>
    </Form.Item>
  );
};

export const SingleSelectFilterInput: LegacyFunctionComponent<
  ExtractFormItemProps<SingleSelectFilterInputValue> & {
    options: MetadataOptions;
  }
> = ({ id, value, onChange, options }) => {
  const parsedValue = useMemo(() => {
    if (!value) {
      return [];
    } else {
      return value.$in;
    }
  }, [value]);

  const handleChange = useCallback<
    NonNullable<SelectProps<string[]>['onChange']>
  >(
    (value) => {
      onChange({ $in: value });
    },
    [onChange],
  );

  return (
    <Select
      id={id}
      value={parsedValue}
      onChange={handleChange}
      allowClear
      mode="multiple"
      style={{ minWidth: 80 }}
    >
      {options?.map((option) => (
        <Select.Option key={option.key} value={option.key}>
          {option.label}
        </Select.Option>
      ))}
    </Select>
  );
};
