import { useObservableState } from 'observable-hooks';
import React, { FunctionComponent, useMemo } from 'react';
import { Redirect } from 'react-router';

import { authStatus$ } from '../../services/session';
import { replaceOrgPath, RoutePath } from '../../utils/history-provider';

export interface HomeProps {}

export const Home: FunctionComponent<HomeProps> = () => {
  const authStatus = useObservableState(authStatus$);

  const path = useMemo(() => {
    if (authStatus && !authStatus.expired && authStatus.auth?.orgName) {
      return replaceOrgPath(RoutePath.Dashboard, authStatus.auth?.orgName);
    } else {
      return RoutePath.Hub;
    }
  }, [authStatus]);

  return <Redirect to={path} />;
};
