import { Box, rem } from '@mantine/core';
import { boxDefinition, BoxDefinitionProps } from '@shukun/widget';

import { createWidget } from '../../abstracts/create-widget';
import { numberToRem } from '../../shares/rem';

export const BoxWidget = createWidget<BoxDefinitionProps>(
  boxDefinition,
  (props) => {
    return (
      <Box
        sx={{
          flexDirection: props.orientation === 'vertical' ? 'column' : 'row',
        }}
        pt={numberToRem(props.paddingTop)}
        pr={numberToRem(props.paddingRight)}
        pb={numberToRem(props.paddingBottom)}
        pl={numberToRem(props.paddingLeft)}
        mt={numberToRem(props.marginTop)}
        mr={numberToRem(props.marginRight)}
        mb={numberToRem(props.marginBottom)}
        ml={numberToRem(props.marginLeft)}
        h={numberToRem(props.height)}
      >
        {props.children}
      </Box>
    );
  },
);
