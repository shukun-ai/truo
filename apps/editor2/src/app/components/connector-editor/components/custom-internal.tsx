import { Text } from '@mantine/core';
import { Handle, NodeProps, Position } from 'reactflow';

import { NodeData } from '../helpers/data-transfer';

import { Card } from './card';

export const CustomInternal = (props: NodeProps<NodeData>) => {
  return (
    <>
      {props.type === 'end' && <Handle type="target" position={Position.Top} />}
      <Card
        {...props}
        label={
          <Text align="center" sx={{ display: 'block', width: '100%' }}>
            {props.type === 'start'
              ? '开始'
              : props.type === 'end'
              ? '结束'
              : '无'}
          </Text>
        }
      />
      {props.type === 'start' && (
        <Handle type="source" position={Position.Bottom} />
      )}
    </>
  );
};
