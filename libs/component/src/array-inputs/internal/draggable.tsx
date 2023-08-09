import { Box } from '@mantine/core';
import { ConnectDragSource, useDrag } from 'react-dnd';

import { DroppableItem } from './types';

export type DraggableProps<T> = {
  dragType: string;
  item: T;
  index: number;
  renderItem: (
    itemValue: T,
    itemChange: (itemValue: T) => void,
    itemRemove: () => void,
    options: {
      drag: ConnectDragSource;
    },
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
    <Box ref={preview}>
      {renderItem(
        item,
        (newValue) => {
          onChange(newValue);
        },
        () => {
          onRemove();
        },
        {
          drag,
        },
      )}
    </Box>
  );
};
