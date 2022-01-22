import React, { FunctionComponent, useMemo } from 'react';

import { ColumnFieldProps } from '../interfaces';

export const TextField: FunctionComponent<ColumnFieldProps> = ({
  electronName,
  row,
}) => {
  const value = useMemo(() => {
    const value = row?.[electronName];
    if (typeof value === 'string' || typeof value === 'number') {
      return value;
    }
    return;
  }, [electronName, row]);

  return <span style={{ overflowWrap: 'anywhere' }}>{value}</span>;
};
