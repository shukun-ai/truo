import { Table } from '@mantine/core';

import { useMemo } from 'react';

import { createWidget } from '../../abstracts/create-widget';

import { TableWidgetProps } from './table.props';

export const TableWidget = createWidget<TableWidgetProps>(
  ({ data, ...props }) => {
    const parsedData = useMemo<unknown[]>(() => {
      return Array.isArray(data) ? data : [];
    }, [data]);

    return (
      <Table {...props}>
        <thead>
          <th>
            <td>测试</td>
          </th>
        </thead>
        <tbody>
          {parsedData.map((item, index) => (
            <tr key={index}>
              <td>cell</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  },
);
