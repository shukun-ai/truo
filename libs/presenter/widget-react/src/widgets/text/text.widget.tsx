import { Text } from '@mantine/core';

import { createWidget } from '../../abstracts/create-widget';

import { TextWidgetProps } from './text.props';

export const TextWidget = createWidget<TextWidgetProps>(
  ({ value, truncate, ...props }) => {
    return (
      <Text truncate={truncate === true ? true : undefined} {...props}>
        {value}
      </Text>
    );
  },
);
