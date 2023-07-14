import { Badge, Group } from '@mantine/core';
import {
  IconBinaryTree,
  IconPlugConnected,
  IconTopologyBus,
  IconTopologyFull,
} from '@tabler/icons-react';
import { ReactNode } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';

import { NodeData } from '../helpers/data-transfer';

import { Card } from './card';
import { MoreButton } from './more-button';

export const TaskCard = (
  props: NodeProps<NodeData> & { children: ReactNode },
) => {
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
            {props.data.taskName}
            {props.data.task?.type && (
              <Badge tt="none">{props.data.task.type}</Badge>
            )}
          </Group>
        }
        more={<MoreButton />}
      >
        {props.children}
      </Card>
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
    default:
      return <IconPlugConnected size="0.95rem" />;
  }
};
