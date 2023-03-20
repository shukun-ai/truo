import { Stack, Divider } from '@mui/material';
import { stackDefinition, StackDefinitionProps } from '@shukun/widget';
import { useMemo } from 'react';

import { createWidget } from '../../abstracts/create-widget';

export const StackWidget = createWidget<StackDefinitionProps>(
  stackDefinition,
  (props) => {
    const divider = useMemo(() => {
      if (!props.divider) {
        return undefined;
      }

      const orientation = props.direction.startsWith('row')
        ? 'vertical'
        : 'horizontal';

      return <Divider orientation={orientation} flexItem />;
    }, [props.direction, props.divider]);

    return (
      <Stack
        direction={props.direction}
        spacing={props.spacing}
        divider={divider}
      >
        {props.children}
      </Stack>
    );
  },
);
