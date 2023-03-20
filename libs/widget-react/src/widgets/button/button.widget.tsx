import { Button } from '@mui/material';
import { buttonDefinition, ButtonDefinitionProps } from '@shukun/widget';
import { useMemo } from 'react';

import { createWidget } from '../../abstracts/create-widget';

export const ButtonWidget = createWidget<ButtonDefinitionProps>(
  buttonDefinition,
  (props) => {
    const isDisabled = useMemo(() => {
      return props.disabled || props.loading;
    }, [props.disabled, props.loading]);

    const text = useMemo(() => {
      // TODO should use icon instead of language.
      return props.loading ? '加载中' : props.text;
    }, [props.loading, props.text]);

    return (
      <Button
        variant={props.variant}
        color={props.color}
        fullWidth={props.fullWidth}
        disabled={isDisabled}
        onClick={() => props.click && props.click(null)}
      >
        {text}
      </Button>
    );
  },
);
