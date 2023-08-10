import { Box, Button } from '@mantine/core';

import {
  mutableAppend,
  mutableRemove,
  mutableUpdate,
} from '@shukun/util-functions';

import { Fragment, useId } from 'react';

import { ConnectDragSource } from 'react-dnd';

import { Draggable } from './internal/draggable';
import { Droppable } from './internal/droppable';

export type ArrayInputProps<T> = {
  value: T[];
  onChange: (value: T[]) => void;
  onCreate: () => T;
  onMove: (sourceIndex: number, targetIndex: number) => void;
  renderItem: (
    itemValue: T,
    itemChange: (itemValue: T) => void,
    itemRemove: () => void,
    options: {
      drag: ConnectDragSource;
    },
  ) => JSX.Element;
  disabled?: boolean;
};

export const ArrayInputs = <T,>({
  value,
  onChange,
  onMove,
  onCreate,
  renderItem,
  disabled,
}: ArrayInputProps<T>) => {
  const dragDropId = useId();

  return (
    <Box>
      <Box>
        {value.map((item, index) => (
          <Fragment key={index}>
            <Draggable
              dragType={`DRAG_DROP_${dragDropId}`}
              item={item}
              index={index}
              renderItem={renderItem}
              onChange={(newItemValue) => {
                onChange(mutableUpdate(value, index, newItemValue));
              }}
              onRemove={() => {
                onChange(mutableRemove(value, index));
              }}
            />
            <Droppable
              dropType={`DRAG_DROP_${dragDropId}`}
              targetIndex={index}
              onMove={onMove}
            />
          </Fragment>
        ))}
      </Box>
      <Box>
        <Button
          onClick={() => {
            onChange(mutableAppend(value, onCreate()));
          }}
          disabled={disabled}
        >
          新增
        </Button>
      </Box>
    </Box>
  );
};
