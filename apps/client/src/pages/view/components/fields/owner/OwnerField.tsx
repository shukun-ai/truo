import { LegacyFunctionComponent } from '@shukun/component';
import React, { FunctionComponent } from 'react';

import { ColumnFieldProps } from '../interfaces';
import { ManyToOneField } from '../many-to-one/ManyToOneField';

export const OwnerField: LegacyFunctionComponent<ColumnFieldProps> = (
  props,
) => {
  return <ManyToOneField {...props} />;
};
