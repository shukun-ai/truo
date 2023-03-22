import { Box } from '@mui/joy';
import { boxDefinition, BoxDefinitionProps } from '@shukun/widget';

import { createWidget } from '../../abstracts/create-widget';

export const BoxWidget = createWidget<BoxDefinitionProps>(
  boxDefinition,
  (props) => {
    return (
      <Box
        sx={{
          flexDirection: props.orientation === 'vertical' ? 'column' : 'row',
          pt: props.paddingTop,
          pr: props.paddingRight,
          pb: props.paddingBottom,
          pl: props.paddingLeft,
        }}
      >
        {props.children}
      </Box>
    );
  },
);
