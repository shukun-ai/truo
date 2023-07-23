import { NumberInput } from '@mantine/core';
import { FLOAT_MAX_SCALE } from '@shukun/validator';

export type WidgetNumberInputProps = {
  value: number | undefined;
  onChange: (newValue: number | undefined) => void;
  isInteger?: boolean;
};

export const WidgetNumberInput = ({
  value,
  onChange,
  isInteger,
}: WidgetNumberInputProps) => {
  return (
    <NumberInput
      precision={isInteger ? undefined : FLOAT_MAX_SCALE}
      value={value}
      onChange={(value) => {
        onChange(value === '' ? undefined : value);
      }}
    />
  );
};
