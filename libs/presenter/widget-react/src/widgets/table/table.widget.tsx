import { Table } from '@mantine/core';

import { IconSortAscending, IconSortDescending } from '@tabler/icons-react';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo } from 'react';

import { createWidget } from '../../abstracts/create-widget';

import { useColumns } from './internal/use-columns';
import { useHeaders } from './internal/use-headers';
import { TableWidgetProps } from './table.props';

export const TableWidget = createWidget<TableWidgetProps>(
  ({ data, children, ...props }) => {
    const parsedData = useMemo<unknown[]>(() => {
      return Array.isArray(data) ? data : [];
    }, [data]);

    const headers = useHeaders(children);
    const columns = useColumns(headers, children);

    const table = useReactTable({
      data: parsedData,
      columns,
      getCoreRowModel: getCoreRowModel(),
      debugTable: false,
    });

    return (
      <Table {...props}>
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
                          desc: <IconSortDescending size={16} stroke={1.5} />,
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
    );
  },
);
