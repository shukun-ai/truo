import { Button } from '@mui/joy';
import { buttonDefinition, ButtonDefinitionProps } from '@shukun/widget';

import { createWidget } from '../../abstracts/create-widget';

export const ButtonWidget = createWidget<ButtonDefinitionProps>(
  buttonDefinition,
  (props) => {
    return (
      <Button
        variant={props.variant}
        color={props.color}
        size={props.size}
        fullWidth={props.fullWidth}
        disabled={props.disabled}
        loading={props.loading}
        onClick={() => props.click && props.click(null)}
      >
        {props.text}
      </Button>
    );
  },
);
