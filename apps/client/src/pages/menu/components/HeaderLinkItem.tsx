import { ViewSchema, ViewType } from '@shukun/schema';
import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import { RoutePath, useOrgPath } from '../../../utils/history-provider';

import { HeaderLinkChildView } from './HeaderLinkChildView';

export interface HeaderLinkItemProps {
  view: ViewSchema;
}

export const HeaderLinkItem: FunctionComponent<HeaderLinkItemProps> = ({
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

  if (view.type === ViewType.Menu) {
    return <HeaderLinkChildView view={view} />;
  }

  return (
    <Link to={{ pathname: `${viewPrefixOrgPath}/${view.name}` }}>
      {view.label}
    </Link>
  );
};
