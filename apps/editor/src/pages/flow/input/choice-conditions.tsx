import { json } from '@codemirror/lang-json';
import { ExtractFormItem, ExtractFormItemProps } from '@shukun/component';
import { LegacyFunctionComponent } from '@shukun/component';
import { Button, Form, message } from 'antd';
import React, { FunctionComponent, useCallback, useMemo } from 'react';

import { InputProps } from '../interface/input';
import {
  closeEventCodeModal,
  openEventCodeModal,
} from '../modal/event-code-modal-service';

export type FormItemValue = unknown;

export const ChoiceConditionsInput: LegacyFunctionComponent<InputProps> = ({
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
        { required, message: 'Please input your choice conditions input!' },
      ]}
    >
      <ExtractFormItem<FormItemValue>>
        {({ value, onChange, id }) => (
          <ChoiceConditionsFromInput
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

interface ChoiceConditionsFromInputProps
  extends ExtractFormItemProps<FormItemValue> {
  label: string;
  editing: boolean;
}

const ChoiceConditionsFromInput: LegacyFunctionComponent<
  ChoiceConditionsFromInputProps
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
      <textarea
        id={id}
        value={stringifyValue}
        placeholder={label}
        style={{ height: 160 }}
      />
      <Button size="small" disabled={!editing} onClick={handleClick}>
        Edit the code
      </Button>
    </div>
  );
};
