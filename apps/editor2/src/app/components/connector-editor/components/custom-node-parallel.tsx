import { NodeProps } from 'reactflow';

import { NodeData } from '../helpers/data-transfer';

import { TaskCard } from './task-card';

export const CustomNodeParallel = (props: NodeProps<NodeData>) => {
  return <TaskCard {...props}>parallel</TaskCard>;
};
