import { SimpleGrid } from '@mantine/core';
import {
  gridDefinition,
  GridDefinitionProps,
} from '@shukun/presenter/definition';
import { useMemo } from 'react';

import { createWidget } from '../../abstracts/create-widget';
import { extractBase } from '../../shares/inheritance';

export const GridWidget = createWidget<GridDefinitionProps>(
  gridDefinition,
  (props) => {
    const breakpoints = useMemo(() => {
      const breakpoints = props.breakpoints;
      if (!breakpoints) {
        return [];
      }
      return breakpoints.map((item) => ({
        cols: item.columns,
        minWidth: item.breakpoint,
      }));
    }, [props.breakpoints]);

    return (
      <SimpleGrid
        {...extractBase(props)}
        cols={props.columns}
        breakpoints={breakpoints}
      >
        {props.children}
      </SimpleGrid>
    );
  },
);
