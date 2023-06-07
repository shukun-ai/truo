import { LegacyFunctionComponent } from '@shukun/component';
import { MetadataSchema, UnknownSourceModel } from '@shukun/schema';
import React, { FunctionComponent, useCallback } from 'react';
import { AiOutlineReload } from 'react-icons/ai';

import { RibbonButton } from '../../../../../components/ribbon/RibbonButton';
import { detailService } from '../../../../../services/detail';

export interface DetailRefreshButtonProps {
  metadata: MetadataSchema;
  source: UnknownSourceModel | null;
}

export const DetailRefreshButton: LegacyFunctionComponent<
  DetailRefreshButtonProps
> = ({ metadata, source }) => {
  const handleClick = useCallback(() => {
    if (source) {
      detailService.findOne(source._id, metadata);
    }
  }, [source, metadata]);

  return (
    <RibbonButton
      name="refresh"
      label="刷新"
      icon={<AiOutlineReload />}
      onClick={handleClick}
    />
  );
};
