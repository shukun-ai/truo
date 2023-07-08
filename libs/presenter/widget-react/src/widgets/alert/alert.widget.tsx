import { Alert } from '@mantine/core';
import {
  alertDefinition,
  AlertDefinitionProps,
} from '@shukun/presenter/definition';

import { createWidget } from '../../abstracts/create-widget';
import { extractBase } from '../../shares/inheritance';

export const AlertWidget = createWidget<AlertDefinitionProps>(
  alertDefinition,
  (props) => {
    return (
      <Alert
        {...extractBase(props)}
        variant={props.variant}
        title={props.title}
      >
        {props.message}
      </Alert>
    );
  },
);
