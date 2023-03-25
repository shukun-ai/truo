import { Button } from '@mantine/core';
import { TableDefinitionColumns } from '@shukun/widget';

import { AppProps } from '../../../abstracts/app.interface';
import { CellFactoryProps } from '../cell.interface';
import { useTableContext } from '../table.context';

export const LinkCell = ({
  getValue,
  row,
  columnContext,
}: CellFactoryProps) => {
  const { app } = useTableContext();

  return (
    <Button
      variant="subtle"
      onClick={() =>
        app && handleClick(app, columnContext, row.original, row.index)
      }
    >
      {getValue()}
    </Button>
  );
};

const handleClick = (
  app: AppProps,
  columnContext: TableDefinitionColumns[number],
  item: unknown,
  index: number,
) => {
  const routerRepository = app.repositoryManager.getRouterRepository();
  const screen = columnContext.link?.screen;

  routerRepository.trigger({
    action: 'push',
    page: screen,
    search: getSearch(app, columnContext, item, index),
  });
};

const getSearch = (
  app: AppProps,
  columnContext: TableDefinitionColumns[number],
  item: unknown,
  index: number,
): any => {
  if (!columnContext.link?.search) {
    return undefined;
  }
  const states = { ...app.states, item, index };
  return app.templateService.run(
    columnContext.link.search,
    states,
    app.helpers,
  );
};
