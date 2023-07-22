import { TextInput } from '@mantine/core';

import { EditorInputProps } from '../editor-inputs.type';
import { useValidate } from '../hooks/use-validate';

export const AtomNameInput = ({
  value,
  onChange,
  required,
  schema,
  disabled,
}: EditorInputProps) => {
  const parsedValue = typeof value === 'string' ? value : '';

  return (
    <TextInput
      value={parsedValue}
      onChange={(event) => onChange(event.target.value)}
      label="数据表名"
      withAsterisk={required}
      {...useValidate(value, schema, '格式不正确')}
      disabled={disabled}
    />
  );
};
