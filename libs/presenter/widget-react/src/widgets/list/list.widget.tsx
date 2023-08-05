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
        {parsedData.map((item, dataIndex) => {
          return children?.map((child, childIndex) => {
            return cloneElement(child, {
              item,
              index: dataIndex,
              key: `${dataIndex}:${childIndex}`, // TODO get the key from child props
            });
          });
        })}
      </Box>
    );
  },
);
