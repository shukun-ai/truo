import { Group, Input, Select, UnstyledButton } from '@mantine/core';
import { append, move, remove, update } from '@shukun/util-functions';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { DndProvider } from '../dnd/dnd-provider';

import { ArrayInputs } from './array-inputs';

type TestSchema = {
  type: string;
  events: {
    test: {
      label: string;
      type: string;
    }[];
  };
};

type TestItem = {
  label: string;
  type: string;
};

const defaultTestSchema = {
  type: 'test',
  events: {
    test: [
      { label: 'first', type: 'country' },
      { label: 'second', type: 'city' },
    ],
  },
};

const ArrayInputParentWrapper = () => {
  const [state, setState] = useState<TestSchema>(defaultTestSchema);

  return (
    <ArrayInputWrapper
      value={state.events}
      onChange={(newValue) =>
        setState({
          ...state,
          events: newValue,
        })
      }
    />
  );
};

const ArrayInputWrapper = ({
  value,
  onChange,
}: {
  value: TestSchema['events'];
  onChange: (newValue: TestSchema['events']) => void;
}) => {
  return (
    <ArrayInputsExample
      value={value.test}
      onChange={(newValue) => {
        onChange({
          ...value,
          test: newValue,
        });
      }}
    />
  );
};

const ArrayInputsExample = ({
  value,
  onChange,
}: {
  value: TestSchema['events']['test'];
  onChange: (newValue: TestSchema['events']['test']) => void;
}) => {
  return (
    <DndProvider>
      <ArrayInputs<TestItem>
        value={value}
        onUpdate={(index, newValue) => onChange(update(value, index, newValue))}
        onCreate={() =>
          onChange(append(value, { label: 'hi', type: 'country' }))
        }
        onMove={(sourceIndex, targetIndex) =>
          onChange(move(value, sourceIndex, targetIndex))
        }
        onRemove={(index) => onChange(remove(value, index))}
        renderItem={(itemValue, itemChange, itemRemove, { index }) => (
          <Group position="left">
            <ArrayInputs.ArrowHandler
              index={index}
              onMove={(sourceIndex, targetIndex) =>
                onChange(move(value, sourceIndex, targetIndex))
              }
            />
            <Input
              value={itemValue.label}
              onChange={(event) => {
                itemChange({
                  ...itemValue,
                  label: event.target.value,
                });
              }}
            />
            <Select
              withinPortal
              clearable
              data={['country', 'city', 'village', 'street']}
              value={itemValue.type}
              onChange={(newValue) => {
                itemChange({
                  ...itemValue,
                  type: newValue ?? 'default',
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

const meta: Meta<typeof ArrayInputsExample> = {
  component: ArrayInputsExample,
};

export default meta;

type Story = StoryObj<typeof ArrayInputsExample>;

export const Primary: Story = {
  render: () => {
    return <ArrayInputParentWrapper />;
  },
};
