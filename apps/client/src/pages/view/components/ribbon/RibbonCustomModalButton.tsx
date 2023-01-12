import { PostMessageCustomModeType } from '@shukun/api';
import { ViewRibbon, ViewSchema, MetadataSchema } from '@shukun/schema';
import { message } from 'antd';
import { useObservableState } from 'observable-hooks';
import React, { FunctionComponent, useCallback, useMemo } from 'react';

import { RibbonButton } from '../../../../components/ribbon/RibbonButton';
import { UnknownSourceModel } from '../../../../models/source';
import { customModalService } from '../../../../services/custom-modal';
import { mode$ } from '../../../../services/detail';
import { searchQuery } from '../../../../services/search';

import { runStringCode } from './runStringCode';

export interface RibbonCustomModalButtonProps {
  customMode: PostMessageCustomModeType;
  view: ViewSchema;
  metadata: MetadataSchema;
  viewRibbon: ViewRibbon;
  sources: UnknownSourceModel[];
}

export const RibbonCustomModalButton: FunctionComponent<
  RibbonCustomModalButtonProps
> = ({ customMode, view, viewRibbon, sources, metadata }) => {
  const mode = useObservableState(mode$);

  const search = useObservableState(searchQuery.activeSearch$);

  const disabled = useMemo(() => {
    return runStringCode(viewRibbon.disabledCode, undefined, sources, mode);
  }, [mode, sources, viewRibbon.disabledCode]);

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
      disabled={disabled}
      disabledTip={viewRibbon.disabledTip}
      color={viewRibbon.color}
      onClick={handleClick}
    />
  );
};
