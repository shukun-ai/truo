import { Box } from '@mantine/core';
import { ConnectorSchema } from '@shukun/schema';

import { TaskEntity } from '../../../../../../repositories/task/task-ref';

import { Task } from './task';

export type TasksProps = {
  value: ConnectorSchema['tasks'];
  onChange: (value: ConnectorSchema['tasks']) => void;
  taskEntities: TaskEntity[];
};

export const Tasks = ({ value, onChange, taskEntities }: TasksProps) => {
  return (
    <Box>
      {Object.entries(value).map(([taskName, task]) => (
        <Task
          name={taskName}
          value={task}
          onChange={(task) =>
            onChange({
              ...value,
              [taskName]: task,
            })
          }
          taskEntities={taskEntities}
        />
      ))}
    </Box>
  );
};
