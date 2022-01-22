import React, { FunctionComponent } from 'react';

import { ColumnFieldProps } from '../interfaces';
import { ManyToOneField } from '../many-to-one/ManyToOneField';

export const OwnerField: FunctionComponent<ColumnFieldProps> = (props) => {
  return <ManyToOneField {...props} />;
};
