import { LegacyFunctionComponent } from '@shukun/component';
import { DatePicker, DatePickerProps } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import React, { FunctionComponent, useMemo, useCallback } from 'react';

export const DateTimeInput: LegacyFunctionComponent<DatePickerProps> = ({
  value,
  onChange,
  ...props
}) => {
  const dateValue = useMemo(() => {
    if (!value) {
      return undefined;
    }
    return dayjs(value as Dayjs);
  }, [value]);

  const handleChange = useCallback(
    (value: Dayjs) => {
      const date = value.toISOString();
      onChange?.(value as any, date);
    },
    [onChange],
  );

  return (
    <DatePicker
      value={dateValue as any}
      onChange={handleChange as any}
      {...props}
    />
  );
};
