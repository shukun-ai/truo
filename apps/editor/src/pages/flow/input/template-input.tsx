import { Form, Input } from 'antd';
import React, { FunctionComponent } from 'react';

import { InputProps } from '../interface/input';

export const TemplateInput: FunctionComponent<InputProps> = ({
  label,
  name,
  required,
}) => {
  return (
    <Form.Item
      label={label}
      name={name}
      rules={[{ required, message: 'Please input your template!' }]}
    >
      <Input />
    </Form.Item>
  );
};
