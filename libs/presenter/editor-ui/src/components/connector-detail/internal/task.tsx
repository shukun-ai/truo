import {
  Badge,
  Box,
  Card,
  Group,
  NativeSelect,
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
  name: string;
  value: ConnectorTask;
  onChange: (value: ConnectorTask | null) => void;
  disabled?: boolean;
};

export const Task = ({ name, value, onChange, disabled }: TaskProps) => {
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
        cursor: selectedTaskName !== name ? 'pointer' : 'default',
      }}
    >
      <Box
        p={6}
        onClick={() => {
          setSelectedTaskName(name);
        }}
      >
        <Group position="apart">
          <Group spacing="xs">
            <Text fz="lg" fw="bold">
              {name}
            </Text>
            <Badge tt="none">{value.type}</Badge>
          </Group>
          <TaskMoreButton onRemove={() => onChange(null)} disabled={disabled} />
        </Group>
      </Box>
      <Box
        // withBorder

        p={6}
        display={selectedTaskName === name ? 'block' : 'none'}
      >
        <NativeSelect
          label="类型"
          data={typeOptions}
          value={value.type}
          onChange={(event) => onChange({ ...value, type: event.target.value })}
          withAsterisk
          disabled={disabled}
        />
        <TaskNextInput
          currentTaskName={name}
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
