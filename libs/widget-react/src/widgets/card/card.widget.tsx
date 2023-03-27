import { Card } from '@mantine/core';
import { cardDefinition, CardDefinitionProps } from '@shukun/widget';

import { createWidget } from '../../abstracts/create-widget';
import { extractBase } from '../../shares/inheritance';
import { numberToRem } from '../../shares/rem';

export const CardWidget = createWidget<CardDefinitionProps>(
  cardDefinition,
  (props) => {
    return (
      <Card
        {...extractBase(props)}
        withBorder={true}
        mb={numberToRem(props.marginBottom)}
      >
        {props.children}
      </Card>
    );
  },
);
