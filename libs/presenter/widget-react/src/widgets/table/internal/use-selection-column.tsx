import { Checkbox } from '@mantine/core';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';

export const useSelectionColumn = () => {
  const selectionColumn = useMemo<ColumnDef<unknown>[]>(() => {
    return [
      {
        id: '_$_selection',
        size: 10,
        header: ({ table }) => (
          <Checkbox
            onChange={table.getToggleAllRowsSelectedHandler()}
            checked={table.getIsAllRowsSelected()}
            indeterminate={table.getIsSomeRowsSelected()}
            size="xs"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            onChange={row.getToggleSelectedHandler()}
            checked={row.getIsSelected()}
            indeterminate={row.getIsSomeSelected()}
            disabled={!row.getCanSelect()}
            size="xs"
          />
        ),
      },
    ];
  }, []);

  return selectionColumn;
};
