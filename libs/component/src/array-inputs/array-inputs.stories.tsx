import type { Meta, StoryObj } from '@storybook/react';

import { DndProvider } from '../dnd/dnd-provider';

import { ArrayInputs } from './array-inputs';

const meta: Meta<typeof ArrayInputs<TestItem>> = {
  component: ArrayInputs,
  argTypes: {
    value: {
      control: {
        type: 'object',
      },
      defaultValue: [{ label: 'first' }, { label: 'second' }],
    },
  },
};

export default meta;

type Story = StoryObj<typeof ArrayInputs<TestItem>>;

export const Primary: Story = {
  args: {
    value: [{ label: 'first' }, { label: 'second' }],
  },
  render: (args) => {
    return (
      <DndProvider>
        <ArrayInputs<TestItem>
          value={args.value}
          onChange={(value) => {
            // eslint-disable-next-line no-console
            console.log(value);
          }}
          onCreate={() => ({ label: 'hi' })}
          renderItem={(itemValue, itemChange, itemRemove, { drag }) => (
            <div>{itemValue.label}</div>
          )}
        />
      </DndProvider>
    );
  },
};

type TestItem = {
  label: string;
};
