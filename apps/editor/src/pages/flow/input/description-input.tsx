import { ExtractFormItem, ExtractFormItemProps } from '@shukun/component';
import { Form, Input } from 'antd';
import React, { FunctionComponent, useCallback } from 'react';

import { InputProps } from '../interface/input';

export type FormItemValue = string;

export const DescriptionInput: FunctionComponent<InputProps> = ({
  label,
  name,
  required,
  editing,
}) => {
  return (
    <Form.Item
      label={label}
      name={name}
      rules={[{ required, message: 'Please input your next input!' }]}
    >
      <ExtractFormItem<FormItemValue>>
        {({ value, onChange, id }) => (
          <DescriptionFormInput
            id={id}
            value={value}
            onChange={onChange}
            label={label}
            editing={editing}
          />
        )}
      </ExtractFormItem>
    </Form.Item>
  );
};

interface DescriptionFormInputProps
  extends ExtractFormItemProps<FormItemValue> {
  label: string;
  editing: boolean;
}

const DescriptionFormInput: FunctionComponent<DescriptionFormInputProps> = ({
  id,
  value,
  onChange,
  label,
  editing,
}) => {
  const handleChange = useCallback(
    (event) => {
      onChange(event.target.value);
    },
    [onChange],
  );

  return (
    <Input
      id={id}
      value={value}
      onChange={handleChange}
      placeholder={label}
      disabled={!editing}
    />
  );
};
