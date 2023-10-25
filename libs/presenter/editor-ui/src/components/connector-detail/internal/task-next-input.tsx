import { Select } from '@mantine/core';
import { useNextOptions } from '@shukun/component';
import { ConnectorTask } from '@shukun/schema';

export type TaskNextInputProps = {
  currentTaskName: string;
  value: ConnectorTask;
  onChange: (value: ConnectorTask | null) => void;
  disabled?: boolean;
};

export const TaskNextInput = ({
  currentTaskName,
  value,
  onChange,
  disabled,
}: TaskNextInputProps) => {
  const { nextOptions } = useNextOptions(currentTaskName);

  return (
    <Select
      label="下一任务"
      data={nextOptions}
      value={value.next || ''}
      onChange={(newValue) =>
        onChange({ ...value, next: newValue || undefined })
      }
      disabled={disabled}
      withinPortal
    />
  );
};
