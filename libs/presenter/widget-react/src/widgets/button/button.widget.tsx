import { Button } from '@mantine/core';
import { buttonDefinition, ButtonDefinitionProps } from '@shukun/widget';

import { createWidget } from '../../abstracts/create-widget';
import { extractBase } from '../../shares/inheritance';

export const ButtonWidget = createWidget<ButtonDefinitionProps>(
  buttonDefinition,
  (props) => {
    return (
      <Button
        {...extractBase(props)}
        variant={props.variant}
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
