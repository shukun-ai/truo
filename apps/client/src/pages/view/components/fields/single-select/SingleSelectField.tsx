import React, { FunctionComponent, useMemo } from 'react';

import { ColumnFieldProps } from '../interfaces';

import { TagSelect } from './TagSelect';

export const SingleSelectField: FunctionComponent<ColumnFieldProps> = ({
  row,
  electronName,
  electronOptions,
}) => {
  const options = useMemo(() => {
    if (!electronOptions) {
      return [];
    }

    return electronOptions;
  }, [electronOptions]);

  const value = useMemo<string | undefined>(() => {
    const value = row?.[electronName];
    return value as string | undefined;
  }, [electronName, row]);

  if (!value) {
    return <></>;
  }

  return <TagSelect keyName={value} options={options} />;
};
