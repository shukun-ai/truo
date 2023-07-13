import { NativeSelect, SelectItem } from '@mantine/core';
import { ConnectorTask } from '@shukun/schema';
import { useMemo } from 'react';

export type TaskNextInputProps = {
  value: ConnectorTask;
  onChange: (value: ConnectorTask | null) => void;
};

export const TaskNextInput = ({ value, onChange }: TaskNextInputProps) => {
  const nextOptions = useMemo<SelectItem[]>(
    () => [{ label: '结束函数流', value: '' }],
    [],
  );

  return (
    <NativeSelect
      label="下一任务"
      data={nextOptions}
      value={value.next}
      onChange={(event) => onChange({ ...value, next: event.target.value })}
    />
  );
};
