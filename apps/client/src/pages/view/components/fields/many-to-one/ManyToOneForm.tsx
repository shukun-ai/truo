import { FormInstance } from 'antd';
import { useObservableState } from 'observable-hooks';
import React, { FunctionComponent } from 'react';

import { UnknownMetadataModel } from '../../../../../models/metadata';
import { sources$ } from '../../../../../services/source';
import { InputFieldProps } from '../interfaces';

import { ManyToOneInput } from './ManyToOneInput';

export interface ManyToOneFormProps extends InputFieldProps {
  form: FormInstance<UnknownMetadataModel>;
  row: UnknownMetadataModel | null;
}

export const ManyToOneForm: FunctionComponent<ManyToOneFormProps> = (props) => {
  const sources = useObservableState(sources$, null);

  if (!sources) {
    return <></>;
  }

  return <ManyToOneInput foreignSources={sources} {...props} />;
};
