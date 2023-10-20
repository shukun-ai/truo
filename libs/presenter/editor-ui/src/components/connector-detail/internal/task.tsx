import {
  Badge,
  Box,
  Card,
  Group,
  Select,
  SelectItem,
  Text,
} from '@mantine/core';
import { useConnectorEditorContext } from '@shukun/component';
import { ConnectorTask } from '@shukun/schema';

import { useMemo } from 'react';

import { TaskEntity, useEditorContext } from '../../../editor-context';

import { Parameters } from './parameters';
import { TaskMoreButton } from './task-more-button';
import { TaskNextInput } from './task-next-input';

export type TaskProps = {
  taskName: string;
  taskLabel: string;
  value: ConnectorTask;
  onChange: (value: ConnectorTask | null) => void;
  disabled?: boolean;
};

export const Task = ({
  taskName,
  taskLabel,
  value,
  onChange,
  disabled,
}: TaskProps) => {
  const { state } = useEditorContext();
  const allTasks = Object.values(state.tasks);

  const typeOptions = useMemo<SelectItem[]>(
    () => allTasks.map((task) => ({ label: task.id, value: task.id })),
    [allTasks],
  );

  const taskEntity = useMemo<TaskEntity | null>(() => {
    const taskEntity = state.tasks[value.type];
    return taskEntity ?? null;
  }, [state.tasks, value.type]);

  const { selectedTaskName, setSelectedTaskName } = useConnectorEditorContext();

  return (
    <Card
      withBorder
      mb={6}
      padding="xs"
      sx={{
        overflow: 'visible',
        cursor: selectedTaskName !== taskName ? 'pointer' : 'default',
      }}
    >
      <Box
        p={6}
        onClick={() => {
          setSelectedTaskName(taskName);
        }}
      >
        <Group position="apart">
          <Group spacing="xs">
            <Text fz="lg" fw="bold">
              {taskLabel}
            </Text>
            <Badge tt="none">{value.type}</Badge>
          </Group>
          <TaskMoreButton onRemove={() => onChange(null)} disabled={disabled} />
        </Group>
      </Box>
      <Box p={6} display={selectedTaskName === taskName ? 'block' : 'none'}>
        <Select
          label="类型"
          data={typeOptions}
          value={value.type}
          onChange={(newValue) =>
            newValue && onChange({ ...value, type: newValue })
          }
          withAsterisk
          disabled={disabled}
        />
        <TaskNextInput
          currentTaskName={taskName}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
        {taskEntity && (
          <Parameters
            taskEntity={taskEntity}
            value={value.parameters}
            onChange={(parameters) =>
              onChange({
                ...value,
                parameters,
              })
            }
            disabled={disabled}
          />
        )}
      </Box>
    </Card>
  );
};
