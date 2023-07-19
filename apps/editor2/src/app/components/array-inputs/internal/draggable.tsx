import { ActionIcon, Box } from '@mantine/core';
import { IconGripVertical } from '@tabler/icons-react';
import { useDrag } from 'react-dnd';

import { DroppableItem } from './types';

export type DraggableProps<T> = {
  dragType: string;
  item: T;
  index: number;
  renderItem: (
    itemValue: T,
    itemChange: (itemValue: T) => void,
    itemRemove: () => void,
  ) => JSX.Element;
  onChange: (newItemValue: T) => void;
  onRemove: () => void;
};

export const Draggable = <T,>({
  dragType,
  item,
  index,
  renderItem,
  onChange,
  onRemove,
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
        {renderItem(
          item,
          (newValue) => {
            onChange(newValue);
          },
          () => {
            onRemove();
          },
        )}
      </Box>
    </Box>
  );
};
