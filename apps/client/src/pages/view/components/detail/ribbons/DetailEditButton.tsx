import { LegacyFunctionComponent } from '@shukun/component';
import { UnknownSourceModel, ViewRibbon } from '@shukun/schema';
import { useObservableState } from 'observable-hooks';
import React, { FunctionComponent, useCallback, useContext } from 'react';
import { AiOutlineEdit, AiOutlineSave, AiOutlineClose } from 'react-icons/ai';

import { RibbonButton } from '../../../../../components/ribbon/RibbonButton';
import {
  DetailMode,
  detailService,
  mode$,
} from '../../../../../services/detail';
import { designSystem } from '../../../../../utils/design-system';
import { FormContext } from '../../form/FormContext';
import { runStringCode } from '../../ribbon/runStringCode';
export interface DetailEditButtonProps {
  viewRibbon: ViewRibbon;
  source: UnknownSourceModel | null;
  sources: UnknownSourceModel[];
}

export const DetailEditButton: LegacyFunctionComponent<
  DetailEditButtonProps
> = ({ viewRibbon, source, sources }) => {
  const mode = useObservableState(mode$);

  const { form } = useContext(FormContext);

  const handleClick = useCallback(() => {
    detailService.set({ mode: DetailMode.Edit });
  }, []);

  if (mode === DetailMode.Show) {
    return (
      <RibbonButton
        name={viewRibbon.name}
        label={viewRibbon.label}
        icon={<AiOutlineEdit />}
        disabled={runStringCode(
          viewRibbon.disabledCode,
          source ?? undefined,
          sources,
          mode,
        )}
        color={viewRibbon.color}
        onClick={handleClick}
      />
    );
  }

  if (mode === DetailMode.Edit) {
    return (
      <>
        <RibbonButton
          name="save"
          label="保存"
          icon={<AiOutlineSave />}
          color={designSystem.colorGreenBase}
          onClick={() => {
            if (form) {
              form.submit();
            }
          }}
        />
        <RibbonButton
          name="cancel"
          label="取消"
          icon={<AiOutlineClose />}
          onClick={() => {
            detailService.set({ mode: DetailMode.Show });
          }}
        />
      </>
    );
  }

  return <></>;
};
