import { Box } from '@mantine/core';

import { createWidget } from '../../abstracts/create-widget';

import { BoxWidgetProps } from './box.props';
import { trimBoxModel } from './internal/trim-box-model';

export const BoxWidget = createWidget<BoxWidgetProps>(
  ({ children, boxModel, ...props }) => {
    return (
      <Box {...trimBoxModel(boxModel)} {...props}>
        {children}
      </Box>
    );
  },
);
