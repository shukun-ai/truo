import { WidgetSchema } from '@shukun/schema';

import tableJson from './widgets/table/table.widget.json';
import textJson from './widgets/text/text.widget.json';

export const editorWidgets: Record<string, WidgetSchema> = {
  text: textJson as WidgetSchema,
  table: tableJson as WidgetSchema,
};
