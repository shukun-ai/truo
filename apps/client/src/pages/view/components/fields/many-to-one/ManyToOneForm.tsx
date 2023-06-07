import { LegacyFunctionComponent } from '@shukun/component';
import { UnknownSourceModel } from '@shukun/schema';
import { FormInstance } from 'antd';
import { useObservableState } from 'observable-hooks';
import React, { FunctionComponent } from 'react';

import { sources$ } from '../../../../../services/source';
import { InputFieldProps } from '../interfaces';

import { ManyToOneInput } from './ManyToOneInput';

export interface ManyToOneFormProps extends InputFieldProps {
  form: FormInstance<UnknownSourceModel>;
  row: UnknownSourceModel | null;
}

export const ManyToOneForm: LegacyFunctionComponent<ManyToOneFormProps> = (
  props,
) => {
  const sources = useObservableState(sources$, null);

  if (!sources) {
    return <></>;
  }

  return <ManyToOneInput foreignSources={sources} {...props} />;
};
