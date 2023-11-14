import { Box } from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react';

import { useState } from 'react';

import { CollapseSection } from './collapse-section';

const CollapseArrowExample = () => {
  const [selected, setSelected] = useState<string | undefined>();

  return (
    <Box>
      <CollapseSection
        name="first"
        label="first"
        selected={selected}
        onSelect={setSelected}
        mb={8}
      >
        First content
      </CollapseSection>
      <CollapseSection
        name="second"
        label="second"
        selected={selected}
        onSelect={setSelected}
        mb={8}
      >
        second content
      </CollapseSection>
    </Box>
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
