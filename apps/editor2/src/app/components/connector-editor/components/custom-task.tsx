import { Box, Group, Text } from '@mantine/core';
import {
  IconAlertTriangle,
  IconBinaryTree,
  IconPlugConnected,
  IconTopologyBus,
  IconTopologyFull,
  IconTransform,
} from '@tabler/icons-react';
import { Handle, NodeProps, Position } from 'reactflow';

import { NodeData } from '../helpers/data-transfer';

import { Card } from './card';

export const CustomTask = (props: NodeProps<NodeData>) => {
  if (!props.data.task) {
    return null;
  }

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <Card
        {...props}
        label={
          <Group spacing="xs">
            {getIcon(props.data.task.type)}
            <Box>
              <Text c="blue" fw="bold" truncate>
                {props.data.taskName}
              </Text>
              <Text c="gray" fz="sm">
                {props.data.task.type}
              </Text>
            </Box>
          </Group>
        }
      />
      <Handle type="source" position={Position.Bottom} />
    </>
  );
};

const getIcon = (type: string) => {
  switch (type) {
    case 'either':
      return <IconBinaryTree size="0.95rem" />;
    case 'parallel':
      return <IconTopologyBus size="0.95rem" />;
    case 'repeat':
      return <IconTopologyFull size="0.95rem" />;
    case 'transformer':
      return <IconTransform size="0.95rem" />;
    case 'fail':
      return <IconAlertTriangle size="0.95rem" />;
    default:
      return <IconPlugConnected size="0.95rem" />;
  }
};
