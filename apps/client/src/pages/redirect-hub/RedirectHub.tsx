import { useEffect, useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { RoutePath } from '../../utils/history-provider';

export interface RedirectHubProps {}

export const RedirectHub = () => {
  const navigate = useNavigate();

  const { orgName } = useParams();

  const { pathname } = useLocation();

  const path = useMemo(() => {
    if (orgName) {
      return '/hub' + pathname;
    } else {
      return RoutePath.Hub;
    }
  }, [orgName, pathname]);

  useEffect(() => {
    navigate(path, { replace: true });
  }, [navigate, path]);

  return null;
};
