import { Text } from '@mantine/core';
import { Handle, NodeProps, Position } from 'reactflow';

import { NodeData } from '../helpers/data-transfer';

import { Card } from './card';

export const CustomNodeEnd = (props: NodeProps<NodeData>) => {
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <Card
        {...props}
        label={
          <Text align="center" sx={{ display: 'block', width: '100%' }}>
            {props.data.taskName}
          </Text>
        }
      />
    </>
  );
};
