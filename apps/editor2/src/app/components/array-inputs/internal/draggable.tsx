import { ActionIcon, Box } from '@mantine/core';
import { mutableUpdate } from '@shukun/util-functions';
import { IconGripVertical } from '@tabler/icons-react';
import { useDrag } from 'react-dnd';

import { DroppableItem } from './types';

export type DraggableProps<T> = {
  dragType: string;
  value: T[];
  item: T;
  index: number;
  renderItem: (itemValue: T, itemChange: (itemValue: T) => void) => JSX.Element;
};

export const Draggable = <T,>({
  dragType,
  value,
  item,
  index,
  renderItem,
}: DraggableProps<T>) => {
  const [, drag, preview] = useDrag<DroppableItem>(() => ({
    type: dragType,
    item: { sourceIndex: index },
  }));

  return (
    <Box
      ref={preview}
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Box>
        <ActionIcon sx={{ cursor: 'move' }} ref={drag}>
          <IconGripVertical size="1rem" />
        </ActionIcon>
      </Box>
      <Box>
        {renderItem(item, (newValue) => {
          mutableUpdate(value, index, newValue);
        })}
      </Box>
    </Box>
  );
};
