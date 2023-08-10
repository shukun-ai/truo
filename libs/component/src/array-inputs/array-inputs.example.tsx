import { Box, Button, Input } from '@mantine/core';
import {
  mutableAppend,
  mutableMove,
  mutableRemove,
  mutableUpdate,
} from '@shukun/util-functions';
import { useState } from 'react';

import { DndProvider } from '../dnd/dnd-provider';

import { ArrayInputs } from './array-inputs';

export const ArrayInputsExample = () => {
  const [state, setState] = useState<TestItem[]>([
    { label: 'first' },
    { label: 'second' },
  ]);

  return (
    <DndProvider>
      <ArrayInputs<TestItem>
        value={state}
        onUpdate={(index, newValue) => {
          setState((state) => mutableUpdate(state, index, newValue));
        }}
        onCreate={() => {
          setState((state) => mutableAppend(state, { label: 'hi' }));
        }}
        onMove={(sourceIndex, targetIndex) => {
          setState((state) => mutableMove(state, sourceIndex, targetIndex));
        }}
        onRemove={(index) => {
          setState((state) => mutableRemove(state, index));
        }}
        renderItem={(itemValue, itemChange, itemRemove, { drag }) => (
          <Box>
            <Button ref={drag}>drag</Button>
            <Box>{JSON.stringify(itemValue)}</Box>
            <Input
              value={itemValue.label}
              onChange={(event) => {
                itemChange({
                  ...itemValue,
                  label: event.target.value,
                });
              }}
            />
            <Button
              onClick={() => {
                itemRemove();
              }}
            >
              x
            </Button>
          </Box>
        )}
      />
    </DndProvider>
  );
};

type TestItem = {
  label: string;
};
