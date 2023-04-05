import { LegacyFunctionComponent } from '@shukun/component';
import { Form, Input } from 'antd';
import React, { FunctionComponent } from 'react';

import { InputProps } from '../interface/input';

export const TemplateInput: LegacyFunctionComponent<InputProps> = ({
  label,
  name,
  required,
  editing,
}) => {
  return (
    <Form.Item
      label={label}
      name={name}
      rules={[{ required, message: 'Please input your template!' }]}
    >
      <Input placeholder={label} disabled={!editing} />
    </Form.Item>
  );
};
