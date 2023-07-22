import { NativeSelect, SelectItem } from '@mantine/core';
import { ConnectorTask } from '@shukun/schema';
import { useMemo } from 'react';

import { useConnectorEditorContext } from '../../../../../components/connector-editor/connector-editor-context';

export type TaskNextInputProps = {
  currentTaskName: string;
  value: ConnectorTask;
  onChange: (value: ConnectorTask | null) => void;
};

export const TaskNextInput = ({
  currentTaskName,
  value,
  onChange,
}: TaskNextInputProps) => {
  const { taskOptions } = useConnectorEditorContext();

  const nextOptions = useMemo<SelectItem[]>(() => {
    const options = taskOptions.filter(
      (task) => task.value !== currentTaskName,
    );
    return [{ label: '结束连接器', value: '' }].concat(options);
  }, [currentTaskName, taskOptions]);

  return (
    <NativeSelect
      label="下一任务"
      data={nextOptions}
      value={value.next}
      onChange={(event) => onChange({ ...value, next: event.target.value })}
    />
  );
};
