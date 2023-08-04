import { useMemo } from 'react';

import { createWidget } from '../../abstracts/create-widget';

import { TableColumnWidgetProps } from './table-column.props';

export const TableColumnWidget = createWidget<TableColumnWidgetProps>(
  ({ title, data, children, ...props }) => {
    const parsedData = useMemo(() => {
      if (
        typeof data === 'string' ||
        typeof data === 'number' ||
        typeof data === 'boolean' ||
        data === undefined ||
        data === null
      ) {
        return data;
      } else {
        return JSON.stringify(data);
      }
    }, [data]);

    return <td>{parsedData}</td>;
  },
);
