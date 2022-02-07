import { Form, Select } from 'antd';
import React, { FunctionComponent, useMemo } from 'react';

import { FilterFieldProps } from '../interfaces';

export const SingleSelectFilter: FunctionComponent<FilterFieldProps> = ({
  label,
  electronName,
  electronOptions,
  tip,
  filterOptions,
}) => {
  const options = useMemo(() => {
    return electronOptions?.filter(
      (item) => filterOptions?.includes(item.key) ?? true,
    );
  }, [electronOptions, filterOptions]);

  return (
    <Form.Item label={label} name={electronName} tooltip={tip}>
      <Select allowClear mode="multiple" style={{ minWidth: 80 }}>
        {options?.map((option) => (
          <Select.Option key={option.key} value={option.key}>
            {option.label}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};
