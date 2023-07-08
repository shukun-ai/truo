import { Card } from '@mantine/core';
import {
  cardDefinition,
  CardDefinitionProps,
} from '@shukun/presenter/definition';

import { createWidget } from '../../abstracts/create-widget';
import { extractBase } from '../../shares/inheritance';

export const CardWidget = createWidget<CardDefinitionProps>(
  cardDefinition,
  (props) => {
    return (
      <Card {...extractBase(props)} withBorder={true}>
        {props.children}
      </Card>
    );
  },
);
