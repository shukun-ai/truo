import { getUniqueLabel } from '@shukun/util-functions';

import { WidgetEntity } from '../../../editor-context';

export const getAutoWidgetTitle = (
  widgetTag: string,
  widgetTitle: string | undefined,
  widgetEntities: Record<string, WidgetEntity>,
): string => {
  const existLabels = Object.values(widgetEntities).map(
    (widget) => widget.label,
  );
  if (widgetTitle) {
    return getUniqueLabel(widgetTitle, existLabels);
  } else {
    return getUniqueLabel(widgetTag, existLabels);
  }
};
