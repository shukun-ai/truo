import { Group, Radio, SelectItem } from '@mantine/core';
import { useMemo } from 'react';

export type WidgetEnumInputProps = {
  value: string | undefined;
  onChange: (newValue: string | undefined) => void;
  enums: string[];
};

export const WidgetEnumInput = ({
  value,
  onChange,
  enums,
}: WidgetEnumInputProps) => {
  const options = useMemo<SelectItem[]>(() => {
    return enums.map((item) => ({
      value: typeof item === 'string' ? item : '',
      label: typeof item === 'string' ? item : '',
    }));
  }, [enums]);

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
