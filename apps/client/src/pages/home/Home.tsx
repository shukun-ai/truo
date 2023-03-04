import { useObservableState } from 'observable-hooks';
import React, { FunctionComponent, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { authStatus$ } from '../../services/session';
import { replaceOrgPath, RoutePath } from '../../utils/history-provider';

export interface HomeProps {}

export const Home: FunctionComponent<HomeProps> = () => {
  const navigate = useNavigate();

  const authStatus = useObservableState(authStatus$);

  const path = useMemo(() => {
    if (authStatus && !authStatus.expired && authStatus.auth?.orgName) {
      return replaceOrgPath(RoutePath.Dashboard, authStatus.auth?.orgName);
    } else {
      return RoutePath.Hub;
    }
  }, [authStatus]);

  useEffect(() => {
    navigate(path, { replace: true });
  }, [navigate, path]);

  return null;
};
