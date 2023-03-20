import { Typography } from '@mui/material';
import { textDefinition, TextDefinitionProps } from '@shukun/widget';

import { createWidget } from '../../abstracts/create-widget';

export const TextWidget = createWidget<TextDefinitionProps>(
  textDefinition,
  (props) => {
    return (
      <Typography
        sx={{
          color: props.color,
        }}
        align={props.align}
        gutterBottom={props.gutterBottom}
        noWrap={props.noWrap}
        variant={props.variant}
      >
        {props.value}
      </Typography>
    );
  },
);
