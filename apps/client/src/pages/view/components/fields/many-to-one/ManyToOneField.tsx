import { LegacyFunctionComponent } from '@shukun/component';
import { useObservableState } from 'observable-hooks';
import React, { FunctionComponent, useMemo } from 'react';

import { sources$ } from '../../../../../services/source';
import { ColumnFieldProps } from '../interfaces';

import { Tag } from './Tag';

export const ManyToOneField: LegacyFunctionComponent<ColumnFieldProps> = ({
  row,
  electronName,
  electronForeignName,
}) => {
  const sources = useObservableState(sources$, []);

  const tag = useMemo(() => {
    const id = row?.[electronName];

    if (!id) {
      return null;
    }

    const source = sources.find((source) => source.source._id === id);

    if (!source) {
      return null;
    }

    if (electronForeignName) {
      const value = source.source?.[electronForeignName] as string;
      const referenceId = source.source._id;

      if (value && referenceId) {
        return {
          value,
          referenceId,
        };
      }
    }

    return;
  }, [electronName, electronForeignName, row, sources]);

  if (!tag) {
    return <>-</>;
  }

  return <Tag referenceId={tag.referenceId} value={tag.value} />;
};
