import { useState } from 'react';

import { DndProvider } from '../dnd/dnd-provider';

import { ArrayInputs } from './array-inputs';

export type ArrayInputsExampleProps = {
  //
};

export const ArrayInputsExample = () => {
  const [state, setState] = useState<TestItem[]>([
    { label: 'first' },
    { label: 'second' },
  ]);

  return (
    <DndProvider>
      <ArrayInputs<TestItem>
        value={state}
        onChange={(value) => {
          // eslint-disable-next-line no-console
          console.log('value', value);
          setState(value);
        }}
        onCreate={() => ({ label: 'hi' })}
        renderItem={(itemValue, itemChange, itemRemove, { drag }) => (
          <div>{itemValue.label}</div>
        )}
      />
    </DndProvider>
  );
};

type TestItem = {
  label: string;
};
