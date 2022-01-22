import React, { FunctionComponent } from 'react';

import { ColumnFieldProps } from '../interfaces';
import { TextField } from '../text/TextField';

export const FloatField: FunctionComponent<ColumnFieldProps> = (props) => {
  return <TextField {...props} />;
};
