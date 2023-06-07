import { LegacyFunctionComponent } from '@shukun/component';
import React, { FunctionComponent, useContext } from 'react';
import { AiOutlineSave } from 'react-icons/ai';

import { RibbonButton } from '../../../../../components/ribbon/RibbonButton';
import { designSystem } from '../../../../../utils/design-system';
import { FormContext } from '../../form/FormContext';

export interface DetailCreateButtonProps {}

export const DetailCreateButton: LegacyFunctionComponent<
  DetailCreateButtonProps
> = () => {
  const { form } = useContext(FormContext);

  return (
    <RibbonButton
      name="create"
      label="保存"
      icon={<AiOutlineSave />}
      color={designSystem.colorGreenBase}
      onClick={() => {
        if (form) {
          form.submit();
        }
      }}
    />
  );
};
