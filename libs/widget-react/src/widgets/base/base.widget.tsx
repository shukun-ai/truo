import { Box } from '@mantine/core';
import { baseDefinition, BaseDefinitionProps } from '@shukun/widget';

import { createWidget } from '../../abstracts/create-widget';
import { extractBase } from '../../shares/inheritance';

export const BaseWidget = createWidget<BaseDefinitionProps>(
  baseDefinition,
  (props) => {
    return (
      <Box {...extractBase(props)}>
        The Base Widget is used for sharing definitions between widgets, please
        do not use this widget.
      </Box>
    );
  },
);
