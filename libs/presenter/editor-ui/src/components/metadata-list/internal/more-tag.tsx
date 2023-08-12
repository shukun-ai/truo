import { Tooltip } from '@mantine/core';
import { IconLock } from '@tabler/icons-react';
import { useMemo } from 'react';

import { MetadataEntity } from '../../../editor-context';

export type MoreTagProps = {
  metadataEntity: MetadataEntity;
};

export const MoreTag = ({ metadataEntity }: MoreTagProps) => {
  const isLock = useMemo(() => {
    return metadataEntity.id.startsWith('system__') ? true : false;
  }, [metadataEntity.id]);

  if (isLock) {
    return (
      <Tooltip label="该数据表为系统内置锁定状态，无法编辑和删除" withinPortal>
        <IconLock size="0.9rem" />
      </Tooltip>
    );
  }

  return null;
};
