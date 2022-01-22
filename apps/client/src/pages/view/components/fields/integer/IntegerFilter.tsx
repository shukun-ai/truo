import { Form, InputNumber } from 'antd';
import React, { FunctionComponent } from 'react';

import { FilterFieldProps } from '../interfaces';

export const IntegerFilter: FunctionComponent<FilterFieldProps> = ({
  label,
  electronName,
  tip,
}) => {
  return (
    <Form.Item label={label} name={electronName} tooltip={tip}>
      <InputNumber />
    </Form.Item>
  );
};
