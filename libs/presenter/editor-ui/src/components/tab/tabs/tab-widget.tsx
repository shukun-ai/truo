import { useMemo } from 'react';

import { TabEntity, useEditorContext } from '../../../editor-context';
import { WidgetDetail } from '../../widget-detail/widget-detail';

export type TabWidgetProps = {
  tab: TabEntity;
};

export const TabWidget = ({ tab }: TabWidgetProps) => {
  const { state } = useEditorContext();

  const widgetEntity = useMemo(() => {
    if (tab.tabType !== 'widget') {
      return null;
    }
    return state.widgets[tab.foreignId];
  }, [state.widgets, tab.foreignId, tab.tabType]);

  const definition = useMemo(() => {
    const { tag } = widgetEntity ?? {};
    if (!tag) {
      return null;
    }
    const definition = state.widgetDefinitions[tag];
    if (!definition) {
      return null;
    }
    return definition;
  }, [widgetEntity, state.widgetDefinitions]);

  if (!widgetEntity || !definition) {
    return null;
  }

  return (
    <WidgetDetail
      tabEntity={tab}
      widgetEntity={widgetEntity}
      widgetDefinition={definition}
    />
  );
};
