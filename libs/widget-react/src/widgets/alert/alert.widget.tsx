import { Alert } from '@mantine/core';
import { alertDefinition, AlertDefinitionProps } from '@shukun/widget';

import { createWidget } from '../../abstracts/create-widget';

export const AlertWidget = createWidget<AlertDefinitionProps>(
  alertDefinition,
  (props) => {
    return (
      <Alert variant={props.variant} title={props.title}>
        {props.message}
      </Alert>
    );
  },
);
