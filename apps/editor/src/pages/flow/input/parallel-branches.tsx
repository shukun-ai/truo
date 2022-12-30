import { json } from '@codemirror/lang-json';
import { ExtractFormItem, ExtractFormItemProps } from '@shukun/component';
import { githubDark } from '@uiw/codemirror-theme-github';
import CodeMirror from '@uiw/react-codemirror';
import { Button, Form, message } from 'antd';
import React, { FunctionComponent, useCallback, useMemo } from 'react';

import { InputProps } from '../interface/input';
import {
  closeEventCodeModal,
  openEventCodeModal,
} from '../modal/event-code-modal-service';

export type FormItemValue = unknown;

export const ParallelBranchesInput: FunctionComponent<InputProps> = ({
  label,
  name,
  required,
  editing,
}) => {
  return (
    <Form.Item
      label={label}
      name={name}
      rules={[
        { required, message: 'Please input your parallel branches input!' },
      ]}
    >
      <ExtractFormItem<FormItemValue>>
        {({ value, onChange, id }) => (
          <ParallelBranchesFromInput
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

interface ParallelBranchesFromInputProps
  extends ExtractFormItemProps<FormItemValue> {
  label: string;
  editing: boolean;
}

const ParallelBranchesFromInput: FunctionComponent<
  ParallelBranchesFromInputProps
> = ({ id, value, onChange, label, editing }) => {
  const stringifyValue = useMemo(() => {
    return JSON.stringify(value, null, 2);
  }, [value]);

  const handleClick = useCallback(() => {
    const stringifyValue = JSON.stringify(value, null, 2);
    openEventCodeModal(stringifyValue, (value) => {
      try {
        const parsedValue = JSON.parse(value);
        onChange(parsedValue);
        closeEventCodeModal();
      } catch (error) {
        message.error('The code is not JSON format.');
      }
    });
  }, [onChange, value]);

  return (
    <div>
      <CodeMirror
        id={id}
        value={stringifyValue}
        theme={githubDark}
        extensions={[json()]}
        editable={false}
        placeholder={label}
        height="160px"
      />
      <Button size="small" disabled={!editing} onClick={handleClick}>
        Edit the code
      </Button>
    </div>
  );
};
