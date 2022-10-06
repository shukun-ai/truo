import React, { FunctionComponent, useMemo } from 'react';

import { ColumnFieldProps } from '../interfaces';

export const MixedField: FunctionComponent<ColumnFieldProps> = ({
  electronName,
  row,
}) => {
  const value = useMemo(() => {
    const value = row?.[electronName];

    return stringify(value);
  }, [electronName, row]);

  return <span style={{ overflowWrap: 'anywhere' }}>{value}</span>;
};

function stringify(value: any) {
  try {
    return JSON.stringify(value);
  } catch {
    return 'JSON 未解析成功';
  }
}
