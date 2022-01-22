import { ViewSchema } from '@shukun/schema';
import { useObservableState } from 'observable-hooks';
import React, { FunctionComponent, useMemo } from 'react';
import { Link } from 'react-router-dom';

import { views$ } from '../../../services/view';
import { RoutePath, useOrgPath } from '../../../utils/history-provider';

export interface HeaderLinkChildViewProps {
  view: ViewSchema;
}

export const HeaderLinkChildView: FunctionComponent<
  HeaderLinkChildViewProps
> = ({ view }) => {
  const viewPrefixOrgPath = useOrgPath(RoutePath.ViewPrefix);

  const views = useObservableState(views$, []);

  const firstChildView = useMemo(() => {
    return views.find((item) => item.parentName === view.name);
  }, [views, view.name]);

  return (
    <Link
      to={{
        pathname: firstChildView
          ? `${viewPrefixOrgPath}/${view.name}/${firstChildView.name}`
          : '',
      }}
    >
      {view.label}
    </Link>
  );
};
