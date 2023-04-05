import { LegacyFunctionComponent } from '@shukun/component';
import React, { FunctionComponent } from 'react';

import { IntegerForm } from '../integer/IntegerForm';
import { InputFieldProps } from '../interfaces';

export const FloatForm: LegacyFunctionComponent<InputFieldProps> = (props) => {
  return <IntegerForm {...props} />;
};
