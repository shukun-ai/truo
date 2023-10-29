import { Cell, Column, Row, Table } from '@tanstack/react-table';
import { cloneElement } from 'react';

import { TableWidgetProps } from '../table.props';

export const createCellComponent = ({
  node,
  index,
}: {
  node: NonNullable<TableWidgetProps['children']>[number];
  index: number;
}): CellProps => {
  return ({ row }) => {
    return cloneElement(node, {
      item: row.original,
      index,
      key: row.id,
    });
  };
};

type CellProps = ({
  row,
}: {
  table: Table<unknown>;
  row: Row<unknown>;
  column: Column<unknown>;
  cell: Cell<unknown, unknown>;
  getValue: () => any;
  renderValue: () => any;
}) => JSX.Element;
