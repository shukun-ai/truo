import { TableDefinitionColumns } from '@shukun/widget';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';

import { CellComponent } from './cell.component';

export const useColumns = (columns: TableDefinitionColumns) => {
  const columnDefinition = useMemo<ColumnDef<unknown>[]>(() => {
    return columns.map((column) => ({
      accessorKey: column.field,
      header: column.label,
      cell: CellComponent,
      meta: {
        columnContext: column,
      },
    }));
  }, [columns]);

  return columnDefinition;
};
