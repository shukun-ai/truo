import React, { FunctionComponent } from 'react';
import { AiFillLock } from 'react-icons/ai';

import { ColumnFieldProps } from '../interfaces';

export const PasswordField: FunctionComponent<ColumnFieldProps> = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <AiFillLock />
    </div>
  );
};
