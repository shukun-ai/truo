import { TextInput } from '@mantine/core';

import { useValidate } from '../hooks/use-validate';

export type AtomNameInputProps = {
  value: unknown;
  onChange: (value: unknown) => void;
  required?: boolean;
  schema: unknown;
};

export const AtomNameInput = ({
  value,
  onChange,
  required,
  schema,
}: AtomNameInputProps) => {
  const parsedValue = typeof value === 'string' ? value : '';

  return (
    <TextInput
      value={parsedValue}
      onChange={(event) => onChange(event.target.value)}
      label="元数据表名"
      withAsterisk={required}
      {...useValidate(value, schema, '格式不正确')}
    />
  );
};
