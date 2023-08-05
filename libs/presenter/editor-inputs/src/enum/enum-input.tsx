import { Group, Radio, SelectItem, Text } from '@mantine/core';
import { useMemo } from 'react';

import { InputWrapper } from '../input-wrapper/input-wrapper';
import { CommonInputProps } from '../types';

export type EnumInputProps = {
  value: string | undefined;
  onChange: (newValue: string | undefined) => void;
  enums: string[];
} & CommonInputProps;

export const EnumInput = ({
  value,
  onChange,
  enums,
  ...props
}: EnumInputProps) => {
  const options = useMemo<SelectItem[]>(() => {
    return enums.map((item) => ({
      value: typeof item === 'string' ? item : '',
      label: typeof item === 'string' ? item : '',
    }));
  }, [enums]);

  return (
    <InputWrapper
      {...props}
      value={value}
      onChange={(newValue) => onChange(newValue)}
      tipSection={<Tip enums={enums} />}
    >
      <Radio.Group value={value} onChange={(newValue) => onChange(newValue)}>
        <Group mt="xs">
          {options.map((option) => (
            <Radio
              key={option.value}
              value={option.value}
              label={option.label}
            />
          ))}
        </Group>
      </Radio.Group>
    </InputWrapper>
  );
};

const Tip = ({ enums }: { enums: string[] }) => {
  return <Text fz={12}>期望返回值：{enums.join(' | ')}</Text>;
};
