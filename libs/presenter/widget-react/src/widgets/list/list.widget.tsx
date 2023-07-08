import { Box } from '@mantine/core';
import {
  listDefinition,
  ListDefinitionProps,
} from '@shukun/presenter/definition';
import { cloneElement } from 'react';

import { createWidget } from '../../abstracts/create-widget';
import { extractBase } from '../../shares/inheritance';

export const ListWidget = createWidget<ListDefinitionProps>(
  listDefinition,
  (props) => {
    return (
      <Box {...extractBase(props)}>
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
