import { TableDefinitionColumns } from '@shukun/presenter/definition';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';

import { CellComponent } from './cell.component';
import { useSelectionColumn } from './use-selection-column';

export const useColumns = (columns: TableDefinitionColumns) => {
  const selectionColumn = useSelectionColumn();

  const columnDefinition = useMemo<ColumnDef<unknown>[]>(() => {
    const columnDefinition = columns.map((column) => ({
      accessorKey: column.field,
      header: column.label,
      cell: CellComponent,
      meta: {
        columnContext: column,
      },
    }));

    return [...selectionColumn, ...columnDefinition];
  }, [columns, selectionColumn]);

  return columnDefinition;
};
