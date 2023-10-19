import { useMemo } from 'react';

import { TabEntity, useEditorContext } from '../../../editor-context';
import { ProcessDetail } from '../../process-detail/process-detail';

export type TabProcessProps = {
  tab: TabEntity;
};

export const TabProcess = ({ tab }: TabProcessProps) => {
  const { state } = useEditorContext();

  const { processes } = state;

  const processEntity = useMemo(() => {
    if (tab.tabType !== 'process') {
      return null;
    }
    return processes[tab.foreignId];
  }, [processes, tab.foreignId, tab.tabType]);

  if (!processEntity) {
    return null;
  }

  return <ProcessDetail tab={tab} processEntity={processEntity} />;
};
