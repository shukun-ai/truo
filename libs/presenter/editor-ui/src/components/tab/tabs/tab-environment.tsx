import { useMemo } from 'react';

import { TabEntity, useEditorContext } from '../../../editor-context';
import { EnvironmentDetail } from '../../environment-detail/environment-detail';

export type TabEnvironmentProps = {
  tab: TabEntity;
};

export const TabEnvironment = ({ tab }: TabEnvironmentProps) => {
  const { state } = useEditorContext();

  const environmentEntity = useMemo(() => {
    if (tab.tabType !== 'environment') {
      return null;
    }
    return state.environments[tab.foreignId];
  }, [state.environments, tab.foreignId, tab.tabType]);

  if (!environmentEntity) {
    return null;
  }

  return <EnvironmentDetail tab={tab} environmentEntity={environmentEntity} />;
};
