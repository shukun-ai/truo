import { ExtractFormItem, ExtractFormItemProps } from '@shukun/component';
import { Form, Input, Select } from 'antd';
import { useObservableState } from 'observable-hooks';
import React, { FunctionComponent, useMemo } from 'react';

import { flowQuery } from '../../../services/flow';

import { InputProps } from '../interface/input';

export type FormItemValue = string;

export const NextInput: FunctionComponent<InputProps> = ({
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
          <NextFormInput
            id={id}
            value={value}
            onChange={onChange}
            editing={editing}
          />
        )}
      </ExtractFormItem>
    </Form.Item>
  );
};

interface NextFormInputProps extends ExtractFormItemProps<FormItemValue> {
  editing: boolean;
}

const NextFormInput: FunctionComponent<NextFormInputProps> = ({
  id,
  value,
  onChange,
  editing,
}) => {
  const flow = useObservableState(flowQuery.activeFlow$);

  const options = useMemo(() => {
    if (!flow) {
      return [];
    }
    return Object.entries(flow.events).map(([eventName, event]) => ({
      label: eventName,
      value: eventName,
    }));
  }, [flow]);

  return (
    <Select
      id={id}
      value={value}
      onChange={onChange}
      disabled={!editing}
      showSearch
    >
      {options?.map((option) => (
        <Select.Option key={option.value} value={option.value}>
          {option.label}
        </Select.Option>
      ))}
    </Select>
  );
};
