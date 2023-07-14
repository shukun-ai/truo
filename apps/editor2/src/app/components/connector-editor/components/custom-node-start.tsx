import { Text } from '@mantine/core';
import { Handle, NodeProps, Position } from 'reactflow';

import { NodeData } from '../helpers/data-transfer';

import { Card } from './card';

export const CustomNodeStart = (props: NodeProps<NodeData>) => {
  return (
    <>
      <Card
        {...props}
        label={
          <Text align="center" sx={{ display: 'block', width: '100%' }}>
            {props.data.taskName}
          </Text>
        }
      />
      <Handle type="source" position={Position.Bottom} />
    </>
  );
};
