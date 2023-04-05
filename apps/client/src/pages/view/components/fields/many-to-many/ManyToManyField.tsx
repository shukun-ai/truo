import { LegacyFunctionComponent } from '@shukun/component';
import { useObservableState } from 'observable-hooks';
import React, { FunctionComponent, useMemo } from 'react';

import { sources$ } from '../../../../../services/source';
import { ColumnFieldProps } from '../interfaces';
import { Tag } from '../many-to-one/Tag';

export const ManyToManyField: LegacyFunctionComponent<ColumnFieldProps> = ({
  row,
  electronForeignName,
  electronName,
}) => {
  const sources = useObservableState(sources$, []);

  const value = useMemo(() => {
    const ids = row?.[electronName];

    if (!Array.isArray(ids)) {
      return [];
    }

    return sources
      .filter((source) => ids.includes(source.source._id))
      .map((source) => source.source);
  }, [electronName, row, sources]);

  if (!electronForeignName) {
    return <></>;
  }

  return (
    <>
      {value.map((child) => (
        <Tag
          key={child._id}
          referenceId={child._id}
          value={child?.[electronForeignName] as string}
        />
      ))}
    </>
  );
};
