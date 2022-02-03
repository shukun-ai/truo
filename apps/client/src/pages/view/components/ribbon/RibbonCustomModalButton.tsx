import { ViewV2Ribbon, ViewSchema, MetadataSchema } from '@shukun/schema';
import { useObservableState } from 'observable-hooks';
import React, { FunctionComponent, useCallback } from 'react';
import { runStringCode } from './runStringCode';

import { RibbonButton } from '../../../../components/ribbon/RibbonButton';
import { UnknownSourceModel } from '../../../../models/source';
import { mode$ } from '../../../../services/detail';
import { customModalService } from '../../../../services/custom-modal';
import { message } from 'antd';

export interface RibbonCustomModalButtonProps {
  view: ViewSchema;
  metadata: MetadataSchema;
  viewRibbon: ViewV2Ribbon;
  sources: UnknownSourceModel[];
}

export const RibbonCustomModalButton: FunctionComponent<
  RibbonCustomModalButtonProps
> = ({ view, viewRibbon, sources, metadata }) => {
  const mode = useObservableState(mode$);

  const handleClick = useCallback(() => {
    if (!viewRibbon.value) {
      message.error('未在 value 里配置 url 值。');
      return;
    }
    customModalService.openModal(
      viewRibbon.label,
      viewRibbon.value,
      sources,
      view,
      metadata,
    );
  }, [viewRibbon.label, viewRibbon.value, sources, view, metadata]);

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
