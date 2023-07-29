import { Box, Button } from '@mantine/core';
import { modals } from '@mantine/modals';
import { ConnectorSchema, ConnectorTask } from '@shukun/schema';

import { useCallback } from 'react';

import { TaskEntity } from '../../../../../../repositories/task/task-ref';

import { CreateTaskForm } from './create-task-form';
import { Task } from './task';

export type TasksProps = {
  value: ConnectorSchema['tasks'];
  onChange: (value: ConnectorSchema['tasks']) => void;
  taskEntities: TaskEntity[];
  disabled?: boolean;
};

export const Tasks = ({
  value,
  onChange,
  taskEntities,
  disabled,
}: TasksProps) => {
  const open = useCallback(() => {
    modals.open({
      title: '新建任务',
      children: (
        <CreateTaskForm
          onSubmit={(formValue) => {
            onChange({
              ...value,
              [formValue.taskName]: {
                type: 'transformer',
                parameters: {},
              },
            });
            modals.closeAll();
          }}
        />
      ),
    });
  }, [onChange, value]);

  const handleChange = (taskName: string, newTask: ConnectorTask | null) => {
    const newValue = structuredClone(value);
    if (!newTask) {
      delete newValue[taskName];
      onChange(newValue);
    } else {
      onChange({
        ...newValue,
        [taskName]: newTask,
      });
    }
  };

  return (
    <Box>
      {Object.entries(value).map(([taskName, task]) => (
        <Task
          key={taskName}
          name={taskName}
          value={task}
          onChange={(newTask) => handleChange(taskName, newTask)}
          taskEntities={taskEntities}
          disabled={disabled}
        />
      ))}
      <Button onClick={open} fullWidth variant="light" disabled={disabled}>
        新建任务
      </Button>
    </Box>
  );
};
