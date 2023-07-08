import { Box, Pagination, Paper, Table } from '@mantine/core';
import {
  tableDefinition,
  TableDefinitionProps,
} from '@shukun/presenter/definition';
import { IconSortAscending, IconSortDescending } from '@tabler/icons-react';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo } from 'react';

import { createWidget } from '../../abstracts/create-widget';
import { extractBase } from '../../shares/inheritance';

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
      debugTable: props.app.context.debug,
    });

    const paginationTotal = useMemo(() => {
      if (!props.totalCounts) {
        return 1;
      }

      return Math.ceil(props.totalCounts / 10);
    }, [props.totalCounts]);

    return (
      <TableContextProvider value={{ app: props.app }}>
        <Paper {...extractBase(props)}>
          <Table highlightOnHover>
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
          <Box
            display="flex"
            sx={{ paddingTop: '2rem', justifyContent: 'flex-end' }}
          >
            <Pagination
              total={paginationTotal}
              onChange={(page) => {
                props.changePage && props.changePage(page);
              }}
            />
          </Box>
        </Paper>
      </TableContextProvider>
    );
  },
);
