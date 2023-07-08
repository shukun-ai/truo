import { TableDefinitionColumns } from '@shukun/presenter/definition';

import { CellComponentProps, CellFactoryProps } from './cell.interface';
import { LinkCell } from './cells/link-cell.component';
import { TextCell } from './cells/text-cell.component';

export const CellComponent = (props: CellComponentProps) => {
  const columnContext: TableDefinitionColumns[number] | undefined = (
    props.column.columnDef.meta as any
  )?.columnContext;

  if (!columnContext) {
    return null;
  }

  return <CellFactory {...props} columnContext={columnContext} />;
};

const CellFactory = (props: CellFactoryProps) => {
  switch (props.columnContext.type) {
    case 'text':
      return <TextCell {...props} />;
    case 'link':
      return <LinkCell {...props} />;
  }
};
