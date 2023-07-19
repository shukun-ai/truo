import { Box, Button } from '@mantine/core';

import { mutableAppend, mutableMove } from '@shukun/util-functions';

import { Fragment, useId } from 'react';

import { Draggable } from './internal/draggable';
import { Droppable } from './internal/droppable';

export type ArrayInputProps<T> = {
  value: T[];
  onChange: (value: T[]) => void;
  onCreate: () => T;
  renderItem: (itemValue: T, itemChange: (itemValue: T) => void) => JSX.Element;
};

export const ArrayInputs = <T,>({
  value,
  onChange,
  onCreate,
  renderItem,
}: ArrayInputProps<T>) => {
  const dragDropId = useId();

  return (
    <Box>
      <Box>
        {value.map((item, index) => (
          <Fragment key={index}>
            <Draggable
              dragType={`DRAG_DROP_${dragDropId}`}
              value={value}
              item={item}
              index={index}
              renderItem={renderItem}
            />
            <Droppable
              dropType={`DRAG_DROP_${dragDropId}`}
              targetIndex={index}
              onChange={(sourceIndex, targetIndex) =>
                onChange(mutableMove(value, sourceIndex, targetIndex))
              }
            />
          </Fragment>
        ))}
      </Box>
      <Box>
        <Button
          onClick={() => {
            onChange(mutableAppend(value, onCreate()));
          }}
        >
          新增
        </Button>
      </Box>
    </Box>
  );
};
