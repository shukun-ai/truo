import { LegacyFunctionComponent } from '@shukun/component';
import React, { FunctionComponent } from 'react';

import { ColumnFieldProps } from '../interfaces';
import { TextField } from '../text/TextField';

export const NameTextField: LegacyFunctionComponent<ColumnFieldProps> = (
  props,
) => {
  return <TextField {...props} />;
};
