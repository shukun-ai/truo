import { useMemo } from 'react';

import { TabEntity, useEditorContext } from '../../../editor-context';
import { ViewDetail } from '../../view-detail/view-detail';

export type TabViewProps = {
  tab: TabEntity;
};

export const TabView = ({ tab }: TabViewProps) => {
  const { state } = useEditorContext();

  const viewEntity = useMemo(() => {
    if (tab.tabType !== 'view') {
      return null;
    }
    return state.views[tab.foreignId];
  }, [state.views, tab.foreignId, tab.tabType]);

  if (!viewEntity) {
    return null;
  }

  return (
    <ViewDetail tab={tab} viewEntity={viewEntity} viewId={viewEntity.id} />
  );
};
