import { Box, Text, Title, TitleOrder } from '@mantine/core';
import { textDefinition, TextDefinitionProps } from '@shukun/widget';
import { useMemo } from 'react';

import { createWidget } from '../../abstracts/create-widget';
import { numberToRem } from '../../shares/rem';

export const TextWidget = createWidget<TextDefinitionProps>(
  textDefinition,
  (props) => {
    const Component = useMemo(() => {
      return ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(props.level)
        ? TitleComponent
        : TextComponent;
    }, [props.level]);

    return (
      <Box
        mt={numberToRem(props.marginTop)}
        mr={numberToRem(props.marginRight)}
        mb={numberToRem(props.marginBottom)}
        ml={numberToRem(props.marginLeft)}
      >
        <Component {...props} />
      </Box>
    );
  },
);

const TextComponent = (props: TextDefinitionProps) => {
  return (
    <Text ta={props.textAlign} c={props.textColor}>
      {props.value}
    </Text>
  );
};

const TitleComponent = (props: TextDefinitionProps) => {
  const order = useMemo<TitleOrder>(() => {
    const level = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
    const index = level.indexOf(props.level);
    const parsedIndex = index >= 0 || index <= 5 ? index : 0;
    const order = parsedIndex + 1;
    return order as TitleOrder;
  }, [props.level]);

  return (
    <Title order={order} ta={props.textAlign} c={props.textColor}>
      {props.value}
    </Title>
  );
};
