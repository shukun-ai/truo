import { TextInput } from '@mantine/core';

export type WidgetStringInputProps = {
  value: string | undefined;
  onChange: (newValue: string | undefined) => void;
};

export const WidgetStringInput = ({
  value,
  onChange,
}: WidgetStringInputProps) => {
  return (
    <TextInput
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  );
};
