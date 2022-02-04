import { ViewV2Ribbon, ViewSchema, MetadataSchema } from '@shukun/schema';
import { useObservableState } from 'observable-hooks';
import React, { FunctionComponent, useCallback } from 'react';
import { runStringCode } from './runStringCode';

import { RibbonButton } from '../../../../components/ribbon/RibbonButton';
import { UnknownSourceModel } from '../../../../models/source';
import { mode$ } from '../../../../services/detail';
import { customModalService } from '../../../../services/custom-modal';
import { message } from 'antd';
import { searchQuery } from '../../../../services/search';
import { CustomMode } from '@shukun/api';

export interface RibbonCustomModalButtonProps {
  customMode: CustomMode;
  view: ViewSchema;
  metadata: MetadataSchema;
  viewRibbon: ViewV2Ribbon;
  sources: UnknownSourceModel[];
}

export const RibbonCustomModalButton: FunctionComponent<
  RibbonCustomModalButtonProps
> = ({ customMode, view, viewRibbon, sources, metadata }) => {
  const mode = useObservableState(mode$);

  const search = useObservableState(searchQuery.activeSearch$);

  const handleClick = useCallback(() => {
    if (!viewRibbon.value) {
      message.error('未在 value 里配置 url 值。');
      return;
    }
    customModalService.openModal(
      customMode,
      viewRibbon.label,
      viewRibbon.value,
      search,
      sources,
      view,
      metadata,
    );
  }, [
    customMode,
    viewRibbon.label,
    viewRibbon.value,
    sources,
    view,
    metadata,
    search,
  ]);

  return (
    <RibbonButton
      name={viewRibbon.name}
      label={viewRibbon.label}
      disabled={runStringCode(
        viewRibbon.disabledCode,
        undefined,
        sources,
        mode,
      )}
      disabledTip={viewRibbon.disabledTip}
      color={viewRibbon.color}
      onClick={handleClick}
    />
  );
};
