import { Box } from '@mantine/core';
import { ConnectorSchema } from '@shukun/schema';

import { Task } from './task';

export type TasksProps = {
  value: ConnectorSchema['tasks'];
  onChange: (value: ConnectorSchema['tasks']) => void;
};

export const Tasks = ({ value, onChange }: TasksProps) => {
  return (
    <Box>
      {Object.entries(value).map(([taskName, task]) => (
        <Task
          value={task}
          onChange={(task) =>
            onChange({
              ...value,
              [taskName]: task,
            })
          }
        />
      ))}
    </Box>
  );
};
