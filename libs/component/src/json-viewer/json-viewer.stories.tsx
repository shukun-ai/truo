import { Box, Text } from '@mantine/core';
import { Meta, StoryObj } from '@storybook/react';

import { useState } from 'react';

import { JsonViewer } from './json-viewer';

const JsonViewerExample = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const data = {
    router: { name: 'home' },
    user: {
      username: 'user',
      group: ['one', 'two'],
      vehicles: {
        car: {
          engine: 'v8',
        },
      },
    },
  };

  return (
    <Box w={540} sx={{ border: 'solid 1px #eee', padding: 12 }}>
      <JsonViewer
        data={data}
        rootLabel="ROOT"
        selected={selected}
        onClick={(selected) => {
          setSelected(selected);
        }}
      />
      <Text mt={12} size="sm">
        selected: {selected.join(', ')}
      </Text>
    </Box>
  );
};

const meta: Meta<typeof JsonViewer> = {
  component: JsonViewer,
};

export default meta;

type Story = StoryObj<typeof JsonViewer>;

export const Primary: Story = {
  render: () => {
    return <JsonViewerExample />;
  },
};
