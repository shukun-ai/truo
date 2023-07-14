import { TextInput } from '@mantine/core';

import { EditorInputProps } from '../editor-inputs.type';
import { useValidate } from '../hooks/use-validate';

export const ParallelBranchesInput = ({
  value,
  onChange,
  required,
  schema,
}: EditorInputProps) => {
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
