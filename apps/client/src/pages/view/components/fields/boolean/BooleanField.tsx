import { CheckOutlined } from '@ant-design/icons';
import React, { FunctionComponent, useMemo } from 'react';

import { ColumnFieldProps } from '../interfaces';

export const BooleanField: FunctionComponent<ColumnFieldProps> = ({
  row,
  electronName,
}) => {
  const value = useMemo(() => {
    const value = row?.[electronName];
    if (typeof value === 'boolean') {
      return value;
    }
  }, [electronName, row]);

  return <>{value ? <CheckOutlined /> : '-'}</>;
};
