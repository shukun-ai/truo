import { Form, Select } from 'antd';
import React, { FunctionComponent } from 'react';

import { FilterFieldProps } from '../interfaces';

export enum BooleanChoose {
  Yes = 'Yes',
  No = 'No',
}

export const BooleanFilter: FunctionComponent<FilterFieldProps> = ({
  label,
  electronName,
  tip,
}) => {
  return (
    <Form.Item label={label} name={electronName} tooltip={tip}>
      <Select style={{ minWidth: 80 }}>
        <Select.Option value={BooleanChoose.Yes}>是</Select.Option>
        <Select.Option value={BooleanChoose.No}>否</Select.Option>
      </Select>
    </Form.Item>
  );
};
