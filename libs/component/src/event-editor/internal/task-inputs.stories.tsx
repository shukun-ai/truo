import { PresenterEvent } from '@shukun/schema';
import type { Meta, StoryObj } from '@storybook/react';

import { useState } from 'react';

import { EventProvider } from './context';
import { TaskInputs } from './task-inputs';

const PrimaryExample = () => {
  const [value, setValue] = useState<PresenterEvent>({
    scope: 'container',
    target: '',
    action: '',
    value: '',
  });

  return (
    <EventProvider
      value={{
        repositories: [
          {
            repositoryName: 'fetch',
            type: 'router',
          },
          {
            repositoryName: 'temporary',
            type: 'temporary',
          },
        ],
        repositoryDefinitions: {
          router: {
            name: 'router',
            scope: 'app',
            parameters: {},
            actions: {
              push: {
                enabledValue: true,
              },
            },
          },
          temporary: {
            name: 'temporary',
            scope: 'container',
            parameters: {},
            actions: {
              set: {
                enabledPath: true,
                enabledValue: true,
              },
            },
          },
        },
      }}
    >
      <TaskInputs
        value={value}
        onChange={(newValue) => setValue(newValue)}
        onRemove={() => {
          //
        }}
      />
    </EventProvider>
  );
};

const meta: Meta<typeof PrimaryExample> = {
  component: PrimaryExample,
};

export default meta;

type Story = StoryObj<typeof PrimaryExample>;

export const Primary: Story = {
  render: () => {
    return <PrimaryExample />;
  },
};
