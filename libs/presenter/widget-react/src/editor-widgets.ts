import { WidgetSchema } from '@shukun/schema';

import boxJson from './widgets/box/box.widget.json';
import buttonJson from './widgets/button/button.widget.json';
import listJson from './widgets/list/list.widget.json';
import rootJson from './widgets/root/root.widget.json';
import tableJson from './widgets/table/table.widget.json';
import tableColumnJson from './widgets/table-column/table-column.widget.json';
import textJson from './widgets/text/text.widget.json';

export const editorWidgets: Record<string, WidgetSchema> = {
  box: boxJson as WidgetSchema,
  button: buttonJson as WidgetSchema,
  list: listJson as WidgetSchema,
  root: rootJson as WidgetSchema,
  table: tableJson as WidgetSchema,
  tableColumn: tableColumnJson as WidgetSchema,
  text: textJson as WidgetSchema,
};
