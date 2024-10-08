import { LegacyFunctionComponent } from '@shukun/component';
import { useObservableState } from 'observable-hooks';
import { useEffect } from 'react';
import {
  Routes as ReactRoutes,
  Route,
  useParams,
  BrowserRouter,
  useNavigate,
  useLocation,
} from 'react-router-dom';

import { authStatus$, sessionService } from '../../services/session';
import { replaceOrgPath, RoutePath } from '../../utils/history-provider';
import { adaptNestedRoute } from '../../utils/history-provider/nested';
import { Dashboard } from '../dashboard';
import { Home } from '../home';
import { Hub } from '../hub';
import { IframePlayground } from '../iframe';
import { ViewLayout } from '../layout/ViewLayout';
import { RedirectHub } from '../redirect-hub';
import { SignIn } from '../sign';
import { Upload } from '../upload';
import { View } from '../view';

import { PermissionLayout } from './components/PermissionLayout';

export interface RoutesProps {}

export const Routes: LegacyFunctionComponent<RoutesProps> = () => {
  return (
    <BrowserRouter>
      <ListenRoutes />
      <ReactRoutes>
        <Route path={RoutePath.Hub} element={<Hub />} />
        <Route path={RoutePath.SignIn} element={<SignIn />} />
        <Route
          path={RoutePath.IframePlayground}
          element={<IframePlayground />}
        />
        <Route
          path={RoutePath.Plugin}
          element={
            <ProtectedRoutes>
              <Upload />
            </ProtectedRoutes>
          }
        />
        <Route
          path={adaptNestedRoute(RoutePath.ViewPage)}
          element={
            <ProtectedRoutes>
              <View />
            </ProtectedRoutes>
          }
        />
        <Route
          path={RoutePath.Dashboard}
          element={
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
          }
        />
        <Route path="/:orgName/views/*" element={<RedirectHub />} />
        <Route path={RoutePath.HomePage} element={<Home />} />
      </ReactRoutes>
    </BrowserRouter>
  );
};

export const ListenRoutes = () => {
  const location = useLocation();
  const params = useParams();

  useEffect(() => {
    if (location.pathname.startsWith(RoutePath.Hub)) {
      const [, , orgName] = location.pathname.split('/');
      const routerOrgName = orgName ?? null;
      sessionService.setAuthByRouter(routerOrgName);
    } else {
      sessionService.setAuthByRouter(null);
    }
  }, [location, params]);

  return null;
};

export const ProtectedRoutes: LegacyFunctionComponent<RoutesProps> = ({
  children,
}) => {
  const navigate = useNavigate();

  const authStatus = useObservableState(authStatus$);

  const { orgName } = useParams<{ orgName?: string }>();

  if (!authStatus) {
    return null;
  }

  if (authStatus.expired) {
    orgName
      ? navigate(replaceOrgPath(RoutePath.SignIn, orgName), { replace: true })
      : navigate(RoutePath.Hub, { replace: true });
  }

  return (
    <PermissionLayout>
      <ViewLayout>{children}</ViewLayout>
    </PermissionLayout>
  );
};
