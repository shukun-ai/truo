import { Card } from '@mantine/core';
import { cardDefinition, CardDefinitionProps } from '@shukun/widget';

import { createWidget } from '../../abstracts/create-widget';
import { numberToRem } from '../../shares/rem';

export const CardWidget = createWidget<CardDefinitionProps>(
  cardDefinition,
  (props) => {
    return (
      <Card withBorder={true} mb={numberToRem(props.marginBottom)}>
        {props.children}
      </Card>
    );
  },
);
