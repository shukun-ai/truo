import { Paper, Table } from '@mantine/core';
import { tableDefinition, TableDefinitionProps } from '@shukun/widget';
import { IconSortAscending, IconSortDescending } from '@tabler/icons-react';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo } from 'react';

import { createWidget } from '../../abstracts/create-widget';

import { TableContextProvider } from './table.context';

import { useColumns } from './use-columns';

export const TableWidget = createWidget<TableDefinitionProps>(
  tableDefinition,
  (props) => {
    const elements = useMemo(() => props.value, [props.value]);

    const columns = useColumns(props.columns);

    const table = useReactTable({
      data: elements,
      columns,
      getCoreRowModel: getCoreRowModel(),
      debugTable: true,
    });

    return (
      <TableContextProvider value={{ app: props.app }}>
        <Paper>
          <Table>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder ? null : (
                          <div
                            {...{
                              className: header.column.getCanSort()
                                ? 'cursor-pointer select-none'
                                : '',
                              onClick: header.column.getToggleSortingHandler(),
                            }}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                            {{
                              asc: <IconSortAscending size={16} stroke={1.5} />,
                              desc: (
                                <IconSortDescending size={16} stroke={1.5} />
                              ),
                            }[header.column.getIsSorted() as string] ?? null}
                          </div>
                        )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody>
              {table
                .getRowModel()
                .rows.slice(0, 10)
                .map((row) => {
                  return (
                    <tr key={row.id}>
                      {row.getVisibleCells().map((cell) => {
                        return (
                          <td key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </Paper>
      </TableContextProvider>
    );
  },
);
