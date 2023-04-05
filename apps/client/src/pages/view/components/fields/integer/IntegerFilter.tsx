import { ExtractFormItem, ExtractFormItemProps } from '@shukun/component';
import { LegacyFunctionComponent } from '@shukun/component';
import { Form, InputNumber, InputNumberProps, SelectProps } from 'antd';
import React, { FunctionComponent, useCallback, useMemo } from 'react';

import { FilterFieldProps } from '../interfaces';

export type IntegerFilterInputValue = { $eq?: number };

export const IntegerFilter: LegacyFunctionComponent<FilterFieldProps> = ({
  label,
  electronName,
  tip,
}) => {
  return (
    <Form.Item label={label} name={electronName} tooltip={tip}>
      <ExtractFormItem<IntegerFilterInputValue>>
        {({ value, onChange, id }) => (
          <IntegerFilterInput id={id} value={value} onChange={onChange} />
        )}
      </ExtractFormItem>
    </Form.Item>
  );
};

export const IntegerFilterInput: LegacyFunctionComponent<
  ExtractFormItemProps<IntegerFilterInputValue>
> = ({ id, value, onChange }) => {
  const parsedValue = useMemo(() => {
    if (typeof value === 'object' && typeof value.$eq === 'number') {
      return value.$eq;
    }
    return undefined;
  }, [value]);

  const handleChange = useCallback<
    NonNullable<InputNumberProps<number>['onChange']>
  >(
    (value) => {
      onChange(
        typeof value === 'number'
          ? {
              $eq: value,
            }
          : undefined,
      );
    },
    [onChange],
  );

  return <InputNumber id={id} value={parsedValue} onChange={handleChange} />;
};
