import { Group, Input, UnstyledButton } from '@mantine/core';
import { append, move, remove, update } from '@shukun/util-functions';
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
          setState((state) => update(state, index, newValue));
        }}
        onCreate={() => {
          setState((state) => append(state, { label: 'hi' }));
        }}
        onMove={(sourceIndex, targetIndex) => {
          setState((state) => move(state, sourceIndex, targetIndex));
        }}
        onRemove={(index) => {
          setState((state) => remove(state, index));
        }}
        renderItem={(itemValue, itemChange, itemRemove, { drag }) => (
          <Group position="left">
            <UnstyledButton ref={drag}>|||</UnstyledButton>
            <Input
              value={itemValue.label}
              onChange={(event) => {
                itemChange({
                  ...itemValue,
                  label: event.target.value,
                });
              }}
            />
            <UnstyledButton
              onClick={() => {
                itemRemove();
              }}
            >
              x
            </UnstyledButton>
          </Group>
        )}
      />
    </DndProvider>
  );
};

type TestItem = {
  label: string;
};
