import { Button } from '@mantine/core';
import { TableDefinitionColumns } from '@shukun/widget';
import { Cell, Column, Row, Table } from '@tanstack/react-table';

import { useTableContext } from './table.context';

export type CellComponentProps = {
  table: Table<unknown>;
  row: Row<unknown>;
  column: Column<unknown>;
  cell: Cell<unknown, unknown>;
  getValue: () => any;
  renderValue: () => any;
};

export const CellComponent = ({
  column,
  getValue,
  renderValue,
}: CellComponentProps) => {
  const columnContext: TableDefinitionColumns[number] | undefined = (
    column.columnDef.meta as any
  )?.columnContext;

  if (!columnContext) {
    return null;
  }

  return <CellFactory getValue={getValue} columnContext={columnContext} />;
};

const CellFactory = (props: CellFactoryProps) => {
  switch (props.columnContext.type) {
    case 'text':
      return <TextCell {...props} />;
    case 'link':
      return <LinkCell {...props} />;
  }
};

const TextCell = ({ getValue, columnContext }: CellFactoryProps) => {
  return <div>{getValue()}</div>;
};

const LinkCell = ({ getValue, columnContext }: CellFactoryProps) => {
  const { app } = useTableContext();

  return (
    <Button
      variant="subtle"
      onClick={() => {
        const routerRepository = app?.repositoryManager.getRouterRepository();
        const templateService = app?.templateService;
        if (!routerRepository || !templateService) {
          return;
        }
        routerRepository.trigger({
          action: 'push',
          page: columnContext.link?.screen,
          //   search: templateService.run(columnContext.link?.search) ,
        });
      }}
    >
      {getValue()}
    </Button>
  );
};

type CellFactoryProps = {
  getValue: () => any;
  columnContext: TableDefinitionColumns[number];
};
