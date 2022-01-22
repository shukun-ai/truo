import { ViewSchema, ViewType } from '@shukun/schema';
import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import { RoutePath, useOrgPath } from '../../../utils/history-provider';

export interface SideLinkItemProps {
  view: ViewSchema;
}

export const SideLinkItem: FunctionComponent<SideLinkItemProps> = ({
  view,
}) => {
  const viewPrefixOrgPath = useOrgPath(RoutePath.ViewPrefix);

  if (view.type === ViewType.Link) {
    return (
      <a href={view.value} target="_blank" rel="noreferrer">
        {view.label}
      </a>
    );
  }

  return (
    <Link to={{ pathname: `${viewPrefixOrgPath}/${view.name}` }}>
      {view.label}
    </Link>
  );
};
