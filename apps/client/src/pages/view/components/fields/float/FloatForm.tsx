import React, { FunctionComponent } from 'react';

import { IntegerForm } from '../integer/IntegerForm';
import { InputFieldProps } from '../interfaces';

export const FloatForm: FunctionComponent<InputFieldProps> = (props) => {
  return <IntegerForm {...props} />;
};
