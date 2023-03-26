import { Box } from '@mantine/core';
import { listDefinition, ListDefinitionProps } from '@shukun/widget';
import { cloneElement } from 'react';

import { createWidget } from '../../abstracts/create-widget';

export const ListWidget = createWidget<ListDefinitionProps>(
  listDefinition,
  (props) => {
    return (
      <Box>
        {props.value?.map((item, key) =>
          cloneElement((props.children as any)[0], {
            item,
            index: key,
            key,
          }),
        )}
      </Box>
    );
  },
);
