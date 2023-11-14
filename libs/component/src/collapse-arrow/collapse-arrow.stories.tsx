import { Group, Text, UnstyledButton } from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react';

import { useState } from 'react';

import { CollapseArrow } from './collapse-arrow';

const CollapseArrowExample = () => {
  const [open, setOpen] = useState(false);

  return (
    <UnstyledButton onClick={() => setOpen(!open)}>
      <Group>
        <CollapseArrow open={open} size="0.7rem" />
        <Text>Click to change arrow direction</Text>
      </Group>
    </UnstyledButton>
  );
};

const meta: Meta<typeof CollapseArrowExample> = {
  component: CollapseArrowExample,
};

export default meta;

type Story = StoryObj<typeof CollapseArrowExample>;

export const Primary: Story = {
  render: () => {
    return <CollapseArrowExample />;
  },
};
