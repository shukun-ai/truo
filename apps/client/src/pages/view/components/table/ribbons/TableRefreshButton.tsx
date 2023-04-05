import { LegacyFunctionComponent } from '@shukun/component';
import { MetadataSchema, ViewSchema } from '@shukun/schema';
import React, { FunctionComponent, useCallback } from 'react';
import { AiOutlineReload } from 'react-icons/ai';

import { RibbonButton } from '../../../../../components/ribbon/RibbonButton';
import { tableService } from '../../../../../services/table';

export interface TableRefreshButtonProps {
  view: ViewSchema;
  metadata: MetadataSchema;
}

export const TableRefreshButton: LegacyFunctionComponent<
  TableRefreshButtonProps
> = ({ view, metadata }) => {
  const handleClick = useCallback(() => {
    tableService.findMany(view, metadata);
  }, [view, metadata]);

  return (
    <RibbonButton
      name="refresh"
      label="刷新"
      icon={<AiOutlineReload />}
      onClick={handleClick}
    />
  );
};
