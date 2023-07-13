import { Box, NativeSelect, SelectItem } from '@mantine/core';
import { ConnectorTask } from '@shukun/schema';
import { useObservableState } from 'observable-hooks';

import { useMemo } from 'react';

import { useAppContext } from '../../../../../contexts/app-context';

export type TaskProps = {
  value: ConnectorTask;
  onChange: (value: ConnectorTask) => void;
};

export const Task = ({ value, onChange }: TaskProps) => {
  const app = useAppContext();
  const allTasks = useObservableState(app.repositories.taskRepository.all$, []);

  const options = useMemo<SelectItem[]>(
    () =>
      allTasks.map((task) => ({ label: task.taskName, value: task.taskName })),
    [allTasks],
  );

  return (
    <Box>
      <NativeSelect
        label="类型"
        data={options}
        value={value.type}
        onChange={(event) => onChange({ ...value, type: event.target.value })}
        withAsterisk
      />
    </Box>
  );
};
