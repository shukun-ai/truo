import { Switch } from '@mantine/core';

export type WidgetBooleanInputProps = {
  value: boolean | undefined;
  onChange: (newValue: boolean | undefined) => void;
};

export const WidgetBooleanInput = ({
  value,
  onChange,
}: WidgetBooleanInputProps) => {
  return (
    <Switch
      checked={value}
      onChange={(event) => onChange(event.currentTarget.checked)}
    />
  );
};
