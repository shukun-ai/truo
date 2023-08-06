import { Box } from '@mantine/core';

import { createWidget } from '../../abstracts/create-widget';

import { BoxWidgetProps } from './box.props';

export const BoxWidget = createWidget<BoxWidgetProps>(
  ({ children, boxModel, ...props }) => {
    return (
      <Box {...boxModel} {...props}>
        {children}
      </Box>
    );
  },
);
