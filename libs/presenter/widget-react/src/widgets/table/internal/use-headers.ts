import { useMemo } from 'react';

import { TableColumnWidgetProps } from '../../table-column/table-column.props';
import { TableWidgetProps } from '../table.props';

export const useHeaders = (children: TableWidgetProps['children']) => {
  const headers = useMemo<TableColumnWidgetProps[]>(() => {
    if (Array.isArray(children)) {
      return children.map((item) => {
        const props = item.props.widget.properties as TableColumnWidgetProps;
        return props;
      });
    } else {
      return [];
    }
  }, [children]);

  return headers;
};
