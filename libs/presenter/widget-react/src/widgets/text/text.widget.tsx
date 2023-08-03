import { Text } from '@mantine/core';

import { createWidget } from '../../abstracts/create-widget';

import { TextWidgetProps } from './text.props';

export const TextWidget = createWidget<TextWidgetProps>(
  ({ value, ...props }) => {
    return <Text {...props}>{value}</Text>;
  },
);
