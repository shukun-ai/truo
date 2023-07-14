import { Text } from '@mantine/core';
import { NodeProps } from 'reactflow';

import { NodeData } from '../helpers/data-transfer';

import { TaskCard } from './task-card';

export const CustomNodeEither = (props: NodeProps<NodeData>) => {
  return (
    <TaskCard {...props}>
      <Text>{JSON.stringify(props.data.task?.parameters.condition)}</Text>
    </TaskCard>
  );
};
