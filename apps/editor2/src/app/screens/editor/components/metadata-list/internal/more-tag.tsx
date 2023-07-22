import { Badge } from '@mantine/core';
import { useMemo } from 'react';

import { MetadataEntity } from '../../../../../../repositories/metadata/metadata-ref';

export type MoreTagProps = {
  metadataEntity: MetadataEntity;
};

export const MoreTag = ({ metadataEntity }: MoreTagProps) => {
  const isLock = useMemo(() => {
    return metadataEntity.metadataName.startsWith('system__') ? true : false;
  }, [metadataEntity.metadataName]);

  if (isLock) {
    return <Badge>系统内置</Badge>;
  }

  return null;
};
