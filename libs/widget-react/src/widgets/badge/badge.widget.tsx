import { Badge, Box } from '@mantine/core';
import { badgeDefinition, BadgeDefinitionProps } from '@shukun/widget';

import { createWidget } from '../../abstracts/create-widget';
import { extractBase } from '../../shares/inheritance';

export const BadgeWidget = createWidget<BadgeDefinitionProps>(
  badgeDefinition,
  (props) => {
    return (
      <Badge
        {...extractBase(props)}
        variant={props.variant}
        color={props.color}
      >
        {props.value}
      </Badge>
    );
  },
);
