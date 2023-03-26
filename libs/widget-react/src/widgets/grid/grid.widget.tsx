import { SimpleGrid } from '@mantine/core';
import { gridDefinition, GridDefinitionProps } from '@shukun/widget';

import { createWidget } from '../../abstracts/create-widget';

export const GridWidget = createWidget<GridDefinitionProps>(
  gridDefinition,
  (props) => {
    return (
      <SimpleGrid
        cols={props.columns}
        spacing={props.horizontalSpacing}
        verticalSpacing={props.verticalSpacing}
      >
        {props.children}
      </SimpleGrid>
    );
  },
);
