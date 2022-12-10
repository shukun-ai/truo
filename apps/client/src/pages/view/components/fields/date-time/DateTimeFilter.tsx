import { DatePicker, Form } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import React, { FunctionComponent, useCallback, useMemo } from 'react';

import {
  ExtractFormItem,
  ExtractFormItemProps,
} from '../../../../../components/form';

import { FilterFieldProps } from '../interfaces';

export type DateTimeFilterInputValue = { $lte?: string; $gte?: string };

export const DateTimeFilter: FunctionComponent<FilterFieldProps> = ({
  label,
  electronName,
  tip,
}) => {
  return (
    <Form.Item label={label} name={electronName} tooltip={tip}>
      <ExtractFormItem<DateTimeFilterInputValue>>
        {({ value, onChange, id }) => (
          <DateTimeFilterInput id={id} value={value} onChange={onChange} />
        )}
      </ExtractFormItem>
    </Form.Item>
  );
};

export const DateTimeFilterInput: FunctionComponent<
  ExtractFormItemProps<DateTimeFilterInputValue>
> = ({ id, value, onChange }) => {
  const parsedValue = useMemo(() => {
    if (!value) {
      return undefined;
    }

    if (
      !value.$gte ||
      !value.$lte ||
      typeof value.$gte !== 'string' ||
      typeof value.$lte !== 'string'
    ) {
      return undefined;
    }

    return [dayjs(value.$gte), dayjs(value.$lte)];
  }, [value]);

  const handleChange = useCallback<(dates: [Dayjs, Dayjs] | null) => void>(
    (dates) => {
      if (dates) {
        const [gte, lte] = dates;
        const value = {
          $gte: gte.startOf('day').toISOString(),
          $lte: lte.endOf('day').toISOString(),
        };
        onChange(value);
      } else {
        onChange(null);
      }
    },
    [onChange],
  );

  // TODO remove any when the antd is upgraded to 5.x
  return (
    <DatePicker.RangePicker
      id={id}
      value={parsedValue as any}
      onChange={handleChange as any}
    />
  );
};
