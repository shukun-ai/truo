import { WidgetSchema } from '@shukun/schema';

import tableJson from './widgets/table/table.widget.json';
import tableColumnJson from './widgets/table-column/table-column.widget.json';
import textJson from './widgets/text/text.widget.json';

export const editorWidgets: Record<string, WidgetSchema> = {
  text: textJson as WidgetSchema,
  table: tableJson as WidgetSchema,
  tableColumn: tableColumnJson as WidgetSchema,
};
