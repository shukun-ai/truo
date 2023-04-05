import { CheckOutlined } from '@ant-design/icons';
import { LegacyFunctionComponent } from '@shukun/component';
import React, { FunctionComponent, useMemo } from 'react';

import { ColumnFieldProps } from '../interfaces';

export const BooleanField: LegacyFunctionComponent<ColumnFieldProps> = ({
  row,
  electronName,
}) => {
  const value = useMemo(() => {
    const value = row?.[electronName];
    if (typeof value === 'boolean') {
      return value;
    }
    return;
  }, [electronName, row]);

  return <>{value ? <CheckOutlined /> : '-'}</>;
};
