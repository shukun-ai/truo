import { Button } from '@mantine/core';

import { createWidget } from '../../abstracts/create-widget';

import { ButtonWidgetProps } from './button.props';

export const ButtonWidget = createWidget<ButtonWidgetProps>(
  ({ text, onClick, ...props }) => {
    return (
      <Button onClick={() => onClick && onClick(undefined)} {...props}>
        {text}
      </Button>
    );
  },
);
