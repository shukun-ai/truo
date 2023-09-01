import { Button } from '@mantine/core';

import { createWidget } from '../../abstracts/create-widget';

import { ButtonWidgetProps } from './button.props';

export const ButtonWidget = createWidget<ButtonWidgetProps>(
  ({ text, onClick, ...props }) => {
    return <Button {...props}>{text}</Button>;
  },
);
