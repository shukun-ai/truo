import { Form, Input } from 'antd';
import React, { FunctionComponent } from 'react';

import { InputProps } from '../interface/input';

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
      <Input placeholder={label} disabled={!editing} />
    </Form.Item>
  );
};
