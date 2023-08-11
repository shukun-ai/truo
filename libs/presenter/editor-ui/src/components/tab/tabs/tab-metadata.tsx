import { useObservableState } from 'observable-hooks';

import { useMemo } from 'react';

import { MetadataDetail } from '../../metadata-detail/metadata-detail';

export type TabMetadataProps = {
  tab: TabEntity;
};

export const TabMetadata = ({ tab }: TabMetadataProps) => {
  const app = useAppContext();

  const allMetadataEntities = useObservableState(
    app.repositories.metadataRepository.all$,
    [],
  );

  const metadataEntity = useMemo(() => {
    if (tab.tabType !== 'metadata') {
      return null;
    }
    const { metadataName } = tab;
    if (!metadataName) {
      return null;
    }
    return allMetadataEntities.find(
      (metadataEntity) => metadataEntity.id === tab.metadataEntityId,
    );
  }, [allMetadataEntities, tab]);

  if (!metadataEntity) {
    return null;
  }

  return <MetadataDetail tab={tab} metadataEntity={metadataEntity} />;
};
