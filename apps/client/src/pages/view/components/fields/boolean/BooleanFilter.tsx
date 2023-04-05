import { ExtractFormItem, ExtractFormItemProps } from '@shukun/component';
import { LegacyFunctionComponent } from '@shukun/component';
import { Form, Select, SelectProps } from 'antd';
import React, { FunctionComponent, useCallback, useMemo } from 'react';

import { FilterFieldProps } from '../interfaces';

export enum BooleanChoose {
  Yes = 'Yes',
  No = 'No',
}

export type BooleanFilterInputValue = { $eq?: boolean; $ne?: boolean };

export const BooleanFilter: LegacyFunctionComponent<FilterFieldProps> = ({
  label,
  electronName,
  tip,
}) => {
  return (
    <Form.Item label={label} name={electronName} tooltip={tip}>
      <ExtractFormItem<BooleanFilterInputValue>>
        {({ value, onChange, id }) => (
          <BooleanFilterInput id={id} value={value} onChange={onChange} />
        )}
      </ExtractFormItem>
    </Form.Item>
  );
};

export const BooleanFilterInput: LegacyFunctionComponent<
  ExtractFormItemProps<BooleanFilterInputValue>
> = ({ id, value, onChange }) => {
  const parsedValue = useMemo(() => {
    if (!value) {
      return undefined;
    } else if (value.$eq === true) {
      return BooleanChoose.Yes;
    } else if (value.$ne === true) {
      return BooleanChoose.No;
    } else {
      return undefined;
    }
  }, [value]);

  const handleChange = useCallback<NonNullable<SelectProps['onChange']>>(
    (value) => {
      onChange(
        value === BooleanChoose.Yes
          ? {
              $eq: true,
            }
          : {
              $ne: true,
            },
      );
    },
    [onChange],
  );

  return (
    <Select
      id={id}
      value={parsedValue as string}
      onChange={handleChange}
      style={{ minWidth: 80 }}
    >
      <Select.Option value={BooleanChoose.Yes}>是</Select.Option>
      <Select.Option value={BooleanChoose.No}>否</Select.Option>
    </Select>
  );
};
