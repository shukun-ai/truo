import { Card, Group, NativeSelect, SelectItem, Text } from '@mantine/core';
import { ConnectorTask } from '@shukun/schema';
import { useObservableState } from 'observable-hooks';

import { useMemo } from 'react';

import { TaskEntity } from '../../../../../../repositories/task/task-ref';
import { useAppContext } from '../../../../../contexts/app-context';

import { Parameters } from './parameters';
import { TaskMoreButton } from './task-more-button';

export type TaskProps = {
  name: string;
  value: ConnectorTask;
  onChange: (value: ConnectorTask | null) => void;
  taskEntities: TaskEntity[];
};

export const Task = ({ name, value, onChange, taskEntities }: TaskProps) => {
  const app = useAppContext();
  const allTasks = useObservableState(app.repositories.taskRepository.all$, []);

  const typeOptions = useMemo<SelectItem[]>(
    () =>
      allTasks.map((task) => ({ label: task.taskName, value: task.taskName })),
    [allTasks],
  );

  const nextOptions = useMemo<SelectItem[]>(
    () => [{ label: '结束函数流', value: '' }],
    [],
  );

  const taskEntity = useMemo<TaskEntity | null>(() => {
    const taskEntity = taskEntities.find(
      (taskEntity) => taskEntity.taskName === value.type,
    );
    return taskEntity ?? null;
  }, [taskEntities, value.type]);

  return (
    <Card withBorder mb={12}>
      <Group position="apart">
        <Text fz="lg">{name}</Text>
        <TaskMoreButton onRemove={() => onChange(null)} />
      </Group>
      <NativeSelect
        label="类型"
        data={typeOptions}
        value={value.type}
        onChange={(event) => onChange({ ...value, type: event.target.value })}
        withAsterisk
      />
      <NativeSelect
        label="下一任务"
        data={nextOptions}
        value={value.next}
        onChange={(event) => onChange({ ...value, next: event.target.value })}
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
        />
      )}
    </Card>
  );
};
