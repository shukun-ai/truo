import { TextInput } from '@mantine/core';

import { InputWrapper } from '../input-wrapper/input-wrapper';
import { CommonInputProps } from '../types';

export type StringInputProps = {
  value: string | undefined;
  onChange: (newValue: string | undefined) => void;
} & CommonInputProps;

export const StringInput = ({
  value,
  onChange,
  ...props
}: StringInputProps) => {
  return (
    <InputWrapper
      {...props}
      value={value}
      onChange={(newValue) => onChange(newValue)}
    >
      <TextInput
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </InputWrapper>
  );
};
