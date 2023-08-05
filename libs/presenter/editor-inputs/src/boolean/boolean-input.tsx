import { Switch } from '@mantine/core';

import { InputWrapper } from '../input-wrapper/input-wrapper';
import { CommonInputProps } from '../types';

export type BooleanInputProps = {
  value: boolean | string | undefined;
  onChange: (newValue: boolean | string | undefined) => void;
} & CommonInputProps;

export const BooleanInput = ({
  value,
  onChange,
  ...props
}: BooleanInputProps) => {
  return (
    <InputWrapper
      {...props}
      value={value}
      onChange={(newValue) => onChange(newValue)}
    >
      <Switch
        checked={typeof value !== 'boolean' ? undefined : value}
        onChange={(event) => onChange(event.currentTarget.checked)}
      />
    </InputWrapper>
  );
};
