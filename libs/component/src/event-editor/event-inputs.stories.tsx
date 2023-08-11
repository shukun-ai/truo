import { PresenterEvent, RepositorySchema } from '@shukun/schema';
import type { Meta, StoryObj } from '@storybook/react';

import { useState } from 'react';

import { DndProvider } from '../dnd/dnd-provider';

import { EventInputs } from './event-inputs';

const PrimaryExample = () => {
  const [value, setValue] = useState<PresenterEvent[]>([]);

  return (
    <DndProvider>
      <EventInputs
        value={value}
        onChange={(newValue) => setValue(newValue)}
        repositories={[
          {
            repositoryName: 'fetch',
            type: 'router',
          },
          {
            repositoryName: 'temporary',
            type: 'temporary',
          },
        ]}
        repositoryDefinitions={
          {
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
          } as Record<string, RepositorySchema>
        }
      />
    </DndProvider>
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
