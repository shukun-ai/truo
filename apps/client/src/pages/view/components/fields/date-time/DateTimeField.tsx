import dayjs from 'dayjs';
import React, { FunctionComponent, useMemo } from 'react';

import { log } from '../../../../../utils/log';
import { ColumnFieldProps } from '../interfaces';

export const DateTimeField: FunctionComponent<ColumnFieldProps> = ({
  row,
  electronName,
}) => {
  const value = useMemo(() => {
    const value = row?.[electronName];

    if (typeof value !== 'string') {
      return undefined;
    }

    const date = dayjs(value);

    if (!date.isValid()) {
      log.error('日期数据源错误');
    }

    return date.format('YYYY-MM-DD HH:mm:ss');
  }, [electronName, row]);

  return <>{value}</>;
};
