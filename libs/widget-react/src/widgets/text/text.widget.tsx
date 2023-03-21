import { Typography } from '@mui/joy';
import { textDefinition, TextDefinitionProps } from '@shukun/widget';

import { createWidget } from '../../abstracts/create-widget';

export const TextWidget = createWidget<TextDefinitionProps>(
  textDefinition,
  (props) => {
    return (
      <Typography
        sx={{
          textAlign: props.textAlign,
        }}
        textColor={props.textColor}
        noWrap={props.noWrap}
        level={props.level}
      >
        {props.value}
      </Typography>
    );
  },
);
