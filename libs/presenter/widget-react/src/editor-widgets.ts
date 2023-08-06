import { WidgetSchema } from '@shukun/schema';

import boxJson from './widgets/box/box.widget.json';
import listJson from './widgets/list/list.widget.json';
import tableJson from './widgets/table/table.widget.json';
import tableColumnJson from './widgets/table-column/table-column.widget.json';
import textJson from './widgets/text/text.widget.json';

export const editorWidgets: Record<string, WidgetSchema> = {
  box: boxJson as WidgetSchema,
  list: listJson as WidgetSchema,
  table: tableJson as WidgetSchema,
  tableColumn: tableColumnJson as WidgetSchema,
  text: textJson as WidgetSchema,
};
