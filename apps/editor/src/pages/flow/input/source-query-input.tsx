import { json } from '@codemirror/lang-json';
import { ExtractFormItem, ExtractFormItemProps } from '@shukun/component';
import { githubDark } from '@uiw/codemirror-theme-github';
import CodeMirror from '@uiw/react-codemirror';
import { Form } from 'antd';
import React, { FunctionComponent, useCallback, useMemo } from 'react';

import { InputProps } from '../interface/input';

export type FormItemValue = unknown;

export const SourceQueryInput: FunctionComponent<InputProps> = ({
  label,
  name,
  required,
  editing,
}) => {
  return (
    <Form.Item
      label={label}
      name={name}
      rules={[{ required, message: 'Please input your source query input!' }]}
    >
      <ExtractFormItem<FormItemValue>>
        {({ value, onChange, id }) => (
          <SourceQueryFromInput
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

interface SourceQueryFromInputProps
  extends ExtractFormItemProps<FormItemValue> {
  label: string;
  editing: boolean;
}

const SourceQueryFromInput: FunctionComponent<SourceQueryFromInputProps> = ({
  id,
  value,
  onChange,
  label,
  editing,
}) => {
  const stringifyValue = useMemo(() => {
    return JSON.stringify(value, null, 2);
  }, [value]);

  const handleChange = useCallback(
    (value) => {
      const parsedValue = JSON.parse(value);
      onChange(parsedValue);
    },
    [onChange],
  );

  return (
    <CodeMirror
      id={id}
      value={stringifyValue}
      onChange={handleChange}
      theme={githubDark}
      extensions={[json()]}
      editable={editing}
      placeholder={label}
      height="160px"
    />
  );
};
