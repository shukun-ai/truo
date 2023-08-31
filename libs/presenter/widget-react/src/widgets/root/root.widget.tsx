import { Box } from '@mantine/core';

import { createWidget } from '../../abstracts/create-widget';

import { RootWidgetProps } from './root.props';

export const RootWidget = createWidget<RootWidgetProps>(
  ({ children, ...props }) => {
    return <Box {...props}>{children}</Box>;
  },
);
