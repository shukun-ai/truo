import { ReactWidget } from './abstracts/loader.interface';

import { BoxWidget } from './widgets/box/box.widget';
import { ButtonWidget } from './widgets/button/button.widget';
import { ListWidget } from './widgets/list/list.widget';
import { RootWidget } from './widgets/root/root.widget';
import { TableWidget } from './widgets/table/table.widget';
import { TableColumnWidget } from './widgets/table-column/table-column.widget';
import { TextWidget } from './widgets/text/text.widget';

export const presenterWidgets: Record<string, ReactWidget> = {
  box: BoxWidget,
  button: ButtonWidget,
  list: ListWidget,
  root: RootWidget,
  table: TableWidget,
  tableColumn: TableColumnWidget,
  text: TextWidget,
};
