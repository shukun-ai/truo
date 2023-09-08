import { Box, Button, Code } from '@mantine/core';
import { Meta, StoryObj } from '@storybook/react';

import { useState } from 'react';

import { JsInput } from './js-input';

const JsInputExample = () => {
  const [value, onChange] = useState<string>('$$_js:');
  const [state, setState] = useState<Record<string, unknown>>(initialState);

  return (
    <Box w={540} sx={{ border: 'solid 1px #eee', padding: 12 }}>
      <JsInput value={value} onChange={onChange} completionState={state} />

      <Box>
        <Button
          onClick={() => {
            setState(nextState);
          }}
        >
          Change state
        </Button>
      </Box>
      <Code block>{JSON.stringify(value, null, 2)}</Code>
      <Code block>{JSON.stringify(state, null, 2)}</Code>
    </Box>
  );
};

const meta: Meta<typeof JsInput> = {
  component: JsInput,
};

export default meta;

type Story = StoryObj<typeof JsInput>;

export const Primary: Story = {
  render: () => {
    return <JsInputExample />;
  },
};

const initialState = {
  auth: {
    current: {
      orgName: 'shukun',
    },
  },
  airports: {
    data: [
      {
        _id: 1,
        code: 'PVG',
      },
      {
        _id: 2,
        code: 'SHA',
      },
    ],
  },
  item: {
    _id: 2,
    code: 'SHA',
  },
};

const nextState = {
  auth: {
    current: {
      orgName: 'shukun',
      username: 'test',
    },
  },
  airports: {
    data: [
      {
        _id: 1,
        code: 'PVG',
      },
      {
        _id: 2,
        code: 'SHA',
      },
      {
        _id: 3,
        code: 'PEK',
      },
    ],
  },
  item: {
    _id: 3,
    code: 'PEK',
    date: '2023-09-08',
  },
};
