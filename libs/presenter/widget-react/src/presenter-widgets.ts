import { ReactWidget } from './abstracts/loader.interface';

import { ListWidget } from './widgets/list/list.widget';
import { TableWidget } from './widgets/table/table.widget';
import { TableColumnWidget } from './widgets/table-column/table-column.widget';
import { TextWidget } from './widgets/text/text.widget';

export const presenterWidgets: Record<string, ReactWidget> = {
  list: ListWidget,
  table: TableWidget,
  tableColumn: TableColumnWidget,
  text: TextWidget,
};
