import { Form, Select } from 'antd';
import React, { FunctionComponent } from 'react';

import { FilterFieldProps } from '../interfaces';

export const SingleSelectFilter: FunctionComponent<FilterFieldProps> = ({
  label,
  electronName,
  electronOptions,
  tip,
}) => {
  return (
    <Form.Item label={label} name={electronName} tooltip={tip}>
      <Select allowClear mode="multiple" style={{ minWidth: 80 }}>
        {electronOptions?.map((option) => (
          <Select.Option key={option.key} value={option.key}>
            {option.label}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};
