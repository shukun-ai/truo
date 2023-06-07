import { LegacyFunctionComponent } from '@shukun/component';
import React, { FunctionComponent } from 'react';

import { ColumnFieldProps } from '../interfaces';
import { TextField } from '../text/TextField';

export const IntegerField: LegacyFunctionComponent<ColumnFieldProps> = (
  props,
) => {
  return <TextField {...props} />;
};
