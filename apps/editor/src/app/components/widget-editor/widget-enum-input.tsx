import { Group, Radio, SelectItem } from '@mantine/core';
import { WidgetProperty } from '@shukun/schema';
import { useMemo } from 'react';

export type WidgetEnumInputProps = {
  value: string | undefined;
  onChange: (newValue: string | undefined) => void;
  widgetProperty: WidgetProperty;
};

export const WidgetEnumInput = ({
  value,
  onChange,
  widgetProperty,
}: WidgetEnumInputProps) => {
  const options = useMemo<SelectItem[]>(() => {
    if (typeof widgetProperty.schema !== 'object') {
      return [];
    }
    const value = widgetProperty.schema.enum ?? [];
    return value.map((item) => ({
      value: typeof item === 'string' ? item : '',
      label: typeof item === 'string' ? item : '',
    }));
  }, [widgetProperty.schema]);

  return (
    <Radio.Group value={value} onChange={(newValue) => onChange(newValue)}>
      <Group mt="xs">
        {options.map((option) => (
          <Radio key={option.value} value={option.value} label={option.label} />
        ))}
      </Group>
    </Radio.Group>
  );
};
