import { MantineProvider } from '@mantine/core';

import { Notifications } from '@mantine/notifications';
import { Preview } from '@storybook/react';
import React from 'react';

import { theme } from './theme';

const preview: Preview = {
  decorators: [
    (Story) => (
      <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
        <Notifications />
        <Story />
      </MantineProvider>
    ),
  ],
};

export default preview;
