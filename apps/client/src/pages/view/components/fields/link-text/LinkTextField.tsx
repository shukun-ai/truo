import { ViewV2LinkType } from '@shukun/schema';
import React, { FunctionComponent, useCallback, useMemo } from 'react';
import { useParams } from 'react-router';

import { useShowRowLink, useViewLink } from '../../../hooks/viewLinkHooks';
import { ColumnFieldProps } from '../interfaces';

export const LinkTextField: FunctionComponent<ColumnFieldProps> = ({
  electronName,
  row,
  viewLink,
}) => {
  const { viewName } = useParams<{ viewName?: string }>();

  const handleViewLink = useViewLink(row, viewLink?.query, viewLink?.value);

  const handleShowRowLink = useShowRowLink(viewName || '', row);

  const value = useMemo(() => {
    const value = row?.[electronName];
    if (typeof value === 'string' || typeof value === 'number') {
      return value;
    }
  }, [electronName, row]);

  const handleClick = useCallback(() => {
    if (viewLink?.type === ViewV2LinkType.View) {
      handleViewLink();
    } else if (viewLink?.type === ViewV2LinkType.ReadOne) {
      handleShowRowLink();
    }
  }, [viewLink?.type, handleViewLink, handleShowRowLink]);

  return (
    <span
      onClick={handleClick}
      style={{
        fontWeight: 'bold',
        textDecoration: 'underline',
        cursor: 'pointer',
        display: 'inline-block',
        width: '100%',
        height: '100%',
      }}
    >
      {value}
    </span>
  );
};
