import { NumberInput as BaseNumberInput } from '@mantine/core';
import { FLOAT_MAX_SCALE } from '@shukun/validator';

import { InputWrapper } from '../input-wrapper/input-wrapper';
import { CommonInputProps } from '../types';

export type NumberInputProps = {
  value: number | string | undefined;
  onChange: (newValue: number | string | undefined) => void;
  isInteger?: boolean;
} & CommonInputProps;

export const NumberInput = ({
  value,
  onChange,
  isInteger,
  ...props
}: NumberInputProps) => {
  return (
    <InputWrapper
      {...props}
      value={value}
      onChange={(newValue) => onChange(newValue)}
    >
      <BaseNumberInput
        precision={isInteger ? undefined : FLOAT_MAX_SCALE}
        value={typeof value !== 'number' ? undefined : value}
        onChange={(value) => {
          onChange(value === '' ? undefined : value);
        }}
      />
    </InputWrapper>
  );
};
