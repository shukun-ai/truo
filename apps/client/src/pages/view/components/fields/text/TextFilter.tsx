import { Form, Input } from 'antd';
import React, { FunctionComponent } from 'react';

import { FilterFieldProps } from '../interfaces';

export const TextFilter: FunctionComponent<FilterFieldProps> = ({
  label,
  electronName,
  tip,
}) => {
  return (
    <Form.Item label={label} name={electronName} tooltip={tip}>
      <Input />
    </Form.Item>
  );
};
