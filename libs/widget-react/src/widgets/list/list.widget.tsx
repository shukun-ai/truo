import { listDefinition, ListDefinitionProps } from '@shukun/widget';
import { cloneElement } from 'react';

import { createWidget } from '../../abstracts/create-widget';

export const ListWidget = createWidget<ListDefinitionProps>(
  listDefinition,
  (props) => {
    return (
      <div>
        {props.value?.map((item, key) =>
          cloneElement((props.children as any)[0], {
            item,
            index: key,
            key,
          }),
        )}
      </div>
    );
  },
);
