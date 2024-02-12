import { LegacyFunctionComponent } from '@shukun/component';
import { Tag as BaseTag } from 'antd';
import { useObservableState } from 'observable-hooks';
import { useMemo, useState } from 'react';

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

  const [expanded, setExpanded] = useState(false);

  if (!electronForeignName) {
    return <></>;
  }

  return (
    <>
      {value.slice(0, expanded ? value.length : 10).map((child) => (
        <Tag
          key={child._id}
          referenceId={child._id}
          value={child?.[electronForeignName] as string}
        />
      ))}
      {value.length > 20 &&
        (expanded ? (
          <BaseTag
            style={{ cursor: 'pointer' }}
            onClick={() => setExpanded(false)}
          >
            &lt;
          </BaseTag>
        ) : (
          <BaseTag
            style={{ cursor: 'pointer' }}
            onClick={() => setExpanded(true)}
          >
            ...
          </BaseTag>
        ))}
    </>
  );
};
