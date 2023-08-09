import { MantineProvider } from '@mantine/core';

import { Preview } from '@storybook/react';
import React from 'react';

import { theme } from './theme';

const preview: Preview = {
  decorators: [
    (Story) => (
      <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
        <Story />
      </MantineProvider>
    ),
  ],
};

export default preview;
