import { Card } from '@mui/joy';
import { cardDefinition, CardDefinitionProps } from '@shukun/widget';

import { createWidget } from '../../abstracts/create-widget';

export const CardWidget = createWidget<CardDefinitionProps>(
  cardDefinition,
  (props) => {
    return <Card variant={props.variant}>{props.children}</Card>;
  },
);
