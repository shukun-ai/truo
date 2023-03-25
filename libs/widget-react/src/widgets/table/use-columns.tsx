import { TableDefinitionColumns } from '@shukun/widget';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';

export const useColumns = (columns: TableDefinitionColumns) => {
  const columnDefinition = useMemo<ColumnDef<unknown>[]>(() => {
    return columns.map((column) => ({
      accessorKey: column.field,
      header: column.label,
    }));
  }, [columns]);

  return columnDefinition;
};
