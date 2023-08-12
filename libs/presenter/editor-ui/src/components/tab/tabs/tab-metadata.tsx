import { useMemo } from 'react';

import { TabEntity, useEditorContext } from '../../../editor-context';
import { MetadataDetail } from '../../metadata-detail/metadata-detail';

export type TabMetadataProps = {
  tab: TabEntity;
};

export const TabMetadata = ({ tab }: TabMetadataProps) => {
  const { state } = useEditorContext();

  const metadataEntity = useMemo(() => {
    if (tab.tabType !== 'metadata') {
      return null;
    }
    return state.metadatas[tab.foreignId];
  }, [state, tab.foreignId, tab.tabType]);

  if (!metadataEntity) {
    return null;
  }

  return <MetadataDetail tab={tab} metadataEntity={metadataEntity} />;
};
