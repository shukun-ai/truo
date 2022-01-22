import React, { FunctionComponent, useMemo } from 'react';

import { ColumnFieldProps } from '../interfaces';
import { TagSelect } from '../single-select/TagSelect';

export const MultiSelectField: FunctionComponent<ColumnFieldProps> = ({
  row,
  electronName,
  electronOptions,
}) => {
  const options = useMemo<
    { key: string; label: string; color?: string }[]
  >(() => {
    if (!electronOptions) {
      return [];
    }

    return electronOptions;
  }, [electronOptions]);

  const value = useMemo<string[]>(() => {
    const value = row?.[electronName];
    return Array.isArray(value) ? value : [];
  }, [electronName, row]);

  return (
    <>
      {value.map((key) => (
        <TagSelect key={key} keyName={key} options={options} />
      ))}
    </>
  );
};
