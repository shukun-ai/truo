import React, { FunctionComponent, useMemo } from 'react';

import { log } from '../../../../../utils/log';
import { ColumnFieldProps } from '../interfaces';

export const CurrencyField: FunctionComponent<ColumnFieldProps> = ({
  row,
  electronName,
  currencyOptions,
}) => {
  const value = useMemo(() => {
    const value = row?.[electronName];
    const code = currencyOptions?.code || 'CNY';

    if (typeof value === 'number') {
      return new Intl.NumberFormat('zh-CN', {
        style: 'currency',
        currency: code,
      }).format(value);
    } else {
      log.error('Currency 字符串数据源错误', value);
    }
    return
  }, [currencyOptions, electronName, row]);

  return <>{value}</>;
};
