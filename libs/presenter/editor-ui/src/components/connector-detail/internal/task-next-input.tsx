import { Select, SelectItem } from '@mantine/core';
import { useConnectorEditorContext } from '@shukun/component';
import { ConnectorTask } from '@shukun/schema';
import { useMemo } from 'react';

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
  const { taskOptions } = useConnectorEditorContext();

  const nextOptions = useMemo<SelectItem[]>(() => {
    const options = taskOptions.filter(
      (task) => task.value !== currentTaskName,
    );
    return [{ label: '结束函数流', value: '' }].concat(options);
  }, [currentTaskName, taskOptions]);

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
