import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';

import { TableColumnWidgetProps } from '../../table-column/table-column.props';

import { TableWidgetProps } from '../table.props';

import { createCellComponent } from './create-cell-component';
import { useSelectionColumn } from './use-selection-column';

export const useColumns = (
  columns: TableColumnWidgetProps[],
  columnNodes: TableWidgetProps['children'],
): ColumnDef<unknown>[] => {
  const selectionColumn = useSelectionColumn();

  const columnDefinition = useMemo<ColumnDef<unknown>[]>(() => {
    const parsedColumnNodes = columnNodes ? columnNodes : [];

    const columnDefinition = columns.map((column, index) => {
      const node = parsedColumnNodes[index];

      return {
        accessorKey: column.title ?? 'key',
        header: column.title,
        cell: createCellComponent({ node, index }),
        meta: {
          columnContext: column,
        },
      };
    });

    return [...selectionColumn, ...columnDefinition];
  }, [columnNodes, columns, selectionColumn]);

  return columnDefinition;
};
