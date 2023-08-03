import { WidgetSchema } from '@shukun/schema';

import textJson from './widgets/text/text.widget.json';

export const editorWidgets: Record<string, WidgetSchema> = {
  text: textJson as WidgetSchema,
};
