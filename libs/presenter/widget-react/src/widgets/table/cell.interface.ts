import { TableDefinitionColumns } from '@shukun/presenter/definition';
import { Cell, Column, Row, Table } from '@tanstack/react-table';

export type CellComponentProps = {
  table: Table<unknown>;
  row: Row<unknown>;
  column: Column<unknown>;
  cell: Cell<unknown, unknown>;
  getValue: () => any;
  renderValue: () => any;
};

export type CellFactoryProps = {
  columnContext: TableDefinitionColumns[number];
} & CellComponentProps;
