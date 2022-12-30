import { ExtractFormItem, ExtractFormItemProps } from '@shukun/component';
import { Form, Input, Select } from 'antd';
import { flow } from 'lodash';
import { useObservableState } from 'observable-hooks';
import React, { FunctionComponent, useMemo } from 'react';

import { metadataQuery } from '../../../services/metadata';

import { InputProps } from '../interface/input';

export type FormItemValue = string;

export const AtomNameInput: FunctionComponent<InputProps> = ({
  label,
  name,
  required,
  editing,
}) => {
  return (
    <Form.Item
      label={label}
      name={name}
      rules={[{ required, message: 'Please input your atom name input!' }]}
    >
      <ExtractFormItem<FormItemValue>>
        {({ value, onChange, id }) => (
          <AtomNameFormInput
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

interface AtomNameFormInputProps extends ExtractFormItemProps<FormItemValue> {
  label: string;
  editing: boolean;
}

const AtomNameFormInput: FunctionComponent<AtomNameFormInputProps> = ({
  id,
  value,
  onChange,
  label,
  editing,
}) => {
  const metadata = useObservableState(metadataQuery.allowSelectedMetadata$);

  const options = useMemo(() => {
    if (!metadata) {
      return [];
    }
    return metadata.map((atom) => ({
      label: `${atom.label} (${atom.name})`,
      value: atom.name,
    }));
  }, [metadata]);

  return (
    <Select
      id={id}
      value={value}
      onChange={onChange}
      disabled={!editing}
      showSearch
      placeholder={label}
    >
      {options?.map((option) => (
        <Select.Option key={option.value} value={option.value}>
          {option.label}
        </Select.Option>
      ))}
    </Select>
  );
};
