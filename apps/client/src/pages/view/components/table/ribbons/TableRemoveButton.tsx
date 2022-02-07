import { MetadataSchema, ViewSchema, ViewV2Ribbon } from '@shukun/schema';
import { useObservableState } from 'observable-hooks';
import React, { FunctionComponent, useCallback, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';

import { RibbonButton } from '../../../../../components/ribbon/RibbonButton';
import { UnknownSourceModel } from '../../../../../models/source';
import { detailService, mode$ } from '../../../../../services/detail';
import { tableService } from '../../../../../services/table';
import { runStringCode } from '../../ribbon/runStringCode';

export interface TableRemoveButtonProps {
  viewRibbon: ViewV2Ribbon;
  view: ViewSchema;
  metadata: MetadataSchema;
  sources: UnknownSourceModel[];
}

// TODO should let table remove support delete many.
export const TableRemoveButton: FunctionComponent<TableRemoveButtonProps> = ({
  viewRibbon,
  view,
  metadata,
  sources,
}) => {
  const mode = useObservableState(mode$);

  const handleClick = useCallback(async () => {
    if (sources.length !== 1) {
      return;
    }
    await detailService.removeOne(sources[0]._id, metadata);
    await tableService.findMany(view, metadata);
  }, [sources, view, metadata]);

  return (
    <RibbonButton
      name={viewRibbon.name}
      label={viewRibbon.label}
      icon={<AiOutlineDelete />}
      disabled={
        sources.length === 1 &&
        runStringCode(
          viewRibbon.disabledCode,
          sources.length === 1 ? sources[0] : undefined,
          sources,
          mode,
        )
      }
      disabledTip={viewRibbon.disabledTip}
      color={viewRibbon.color}
      onClick={handleClick}
    />
  );
};
