import { Box } from '@mantine/core';

import { cloneElement, useMemo } from 'react';

import { createWidget } from '../../abstracts/create-widget';

import { ListWidgetProps } from './list.props';

export const ListWidget = createWidget<ListWidgetProps>(
  ({ data, children, ...props }) => {
    const parsedData = useMemo<unknown[]>(() => {
      return Array.isArray(data) ? data : [];
    }, [data]);

    return (
      <Box {...props}>
        {parsedData.map((item, index) => {
          return children?.map((child) => {
            return cloneElement(child, {
              item,
              index,
              key: index, // TODO get the key from child props
            });
          });
        })}
      </Box>
    );
  },
);
