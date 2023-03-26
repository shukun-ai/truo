import { Box } from '@mantine/core';
import { boxDefinition, BoxDefinitionProps } from '@shukun/widget';

import { createWidget } from '../../abstracts/create-widget';

export const BoxWidget = createWidget<BoxDefinitionProps>(
  boxDefinition,
  (props) => {
    return (
      <Box
        sx={{
          flexDirection: props.orientation === 'vertical' ? 'column' : 'row',
          pt: `${props.paddingTop}rem`,
          pr: `${props.paddingRight}rem`,
          pb: `${props.paddingBottom}rem`,
          pl: `${props.paddingLeft}rem`,
        }}
      >
        {props.children}
      </Box>
    );
  },
);
