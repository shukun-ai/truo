import { UnknownSourceModel } from '@shukun/schema';
import { FormInstance } from 'antd';
import { useObservableState } from 'observable-hooks';
import React, { FunctionComponent } from 'react';

import { sources$ } from '../../../../../services/source';
import { InputFieldProps } from '../interfaces';

import { ManyToManyInput } from './ManyToManyInput';

export interface ManyToManyFormProps extends InputFieldProps {
  form: FormInstance<UnknownSourceModel>;
  row: UnknownSourceModel | null;
}

export const ManyToManyForm: FunctionComponent<ManyToManyFormProps> = (
  props,
) => {
  const sources = useObservableState(sources$, null);

  if (!sources) {
    return <></>;
  }

  return <ManyToManyInput foreignSources={sources} {...props} />;
};
