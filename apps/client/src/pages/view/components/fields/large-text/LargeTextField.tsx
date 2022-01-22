import React, { FunctionComponent } from 'react';

import { ColumnFieldProps } from '../interfaces';
import { TextField } from '../text/TextField';

export const LargeTextField: FunctionComponent<ColumnFieldProps> = ({
  ...props
}) => {
  return <TextField {...props} />;
};
