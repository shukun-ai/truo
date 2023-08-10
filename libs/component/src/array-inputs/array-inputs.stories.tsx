import type { Meta, StoryObj } from '@storybook/react';

import { ArrayInputsExample } from './array-inputs.example';

const meta: Meta<typeof ArrayInputsExample> = {
  component: ArrayInputsExample,
};

export default meta;

type Story = StoryObj<typeof ArrayInputsExample>;

export const Primary: Story = {
  render: () => {
    return <ArrayInputsExample />;
  },
};
