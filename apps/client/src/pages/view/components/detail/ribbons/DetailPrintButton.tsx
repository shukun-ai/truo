import { ViewV2Ribbon } from '@shukun/schema';
import { useObservableState } from 'observable-hooks';
import React, { FunctionComponent, useCallback } from 'react';
import { AiOutlinePrinter } from 'react-icons/ai';

import { RibbonButton } from '../../../../../components/ribbon/RibbonButton';
import { UnknownSourceModel } from '../../../../../models/source';
import { DetailMode, mode$ } from '../../../../../services/detail';
import { runStringCode } from '../../ribbon/runStringCode';

export interface DetailPrintButtonProps {
  viewRibbon: ViewV2Ribbon;
  source: UnknownSourceModel | null;
  sources: UnknownSourceModel[];
}

export const DetailPrintButton: FunctionComponent<DetailPrintButtonProps> = ({
  viewRibbon,
  source,
  sources,
}) => {
  const mode = useObservableState(mode$);

  const handleClick = useCallback(() => {
    window.print();
  }, []);

  return (
    <RibbonButton
      name={viewRibbon.name}
      label={viewRibbon.label}
      icon={<AiOutlinePrinter />}
      disabled={
        mode !== DetailMode.Show ||
        runStringCode(
          viewRibbon.disabledCode,
          source ?? undefined,
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
