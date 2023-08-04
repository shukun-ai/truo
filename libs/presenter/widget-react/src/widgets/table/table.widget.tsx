import { Table } from '@mantine/core';

import { cloneElement, useMemo } from 'react';

import { createWidget } from '../../abstracts/create-widget';

import { useHeaders } from './internal/use-headers';
import { TableWidgetProps } from './table.props';

export const TableWidget = createWidget<TableWidgetProps>(
  ({ data, children, ...props }) => {
    const parsedData = useMemo<unknown[]>(() => {
      return Array.isArray(data) ? data : [];
    }, [data]);

    const headers = useHeaders(children);

    return (
      <Table {...props}>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <td key={index}>{header.title}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          {parsedData.map((item, index) => (
            <tr key={index}>
              {children?.map((child, index) => {
                return cloneElement(child, {
                  item,
                  index,
                  key: index, // TODO get the key from child props
                });
              })}
            </tr>
          ))}
        </tbody>
      </Table>
    );
  },
);
